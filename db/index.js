import Realm from 'realm'
import { LocalDate, ChronoUnit } from '@js-joda/core'
import fs from 'react-native-fs'

import schemas from './schemas'
import cycleModule from '../lib/cycle'
import maybeSetNewCycleStart from '../lib/set-new-cycle-start'

let db
let checkIsMensesStart
let getMensesDaysRightAfter

export async function openDb(hash) {
  const realmConfig = {}
  if (hash) {
    realmConfig.encryptionKey = hashToInt8Array(hash)
  }

  // perform migrations if necessary, see https://realm.io/docs/javascript/2.8.0/#migrations
  // we open the db temporarily, to get the schema version even if the db is encrypted
  let tempConnection
  try {
    tempConnection = await Realm.open(realmConfig)
  } catch (err) {
    const isErrorDecrypting = err.toString().includes('decrypt')
    const isErrorMnemonic = err.toString().includes('Invalid mnemonic')
    // tried to open without password, but is encrypted or incorrect pwd
    if (isErrorMnemonic) return false
    // cannot decrypt db with given pwd
    if (hash && isErrorDecrypting) return false

    throw err
  }

  let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath)
  tempConnection.close()
  while (nextSchemaIndex < schemas.length - 1) {
    const tempConfig = Object.assign(realmConfig, schemas[nextSchemaIndex++])
    const migratedRealm = new Realm(tempConfig)
    migratedRealm.close()
  }

  // open the Realm with the latest schema
  realmConfig.schema = schemas[schemas.length - 1]
  const connection = await Realm.open(
    Object.assign(realmConfig, schemas[schemas.length - 1])
  )

  db = connection
  const cycle = cycleModule()
  checkIsMensesStart = cycle.isMensesStart
  getMensesDaysRightAfter = cycle.getMensesDaysRightAfter
  return true
}

export function closeDb() {
  db.close()
}

export function mapRealmObjToJsObj(realmObj) {
  return realmObj ? JSON.parse(JSON.stringify(realmObj)) : realmObj
}

export function getBleedingDaysSortedByDate() {
  return db
    .objects('CycleDay')
    .filtered('bleeding != null')
    .sorted('date', true)
}
export function getTemperatureDaysSortedByDate() {
  return db
    .objects('CycleDay')
    .filtered('temperature != null')
    .sorted('date', true)
}

export function getCycleDaysSortedByDate() {
  const cycleDays = db.objects('CycleDay').sorted('date', true)
  return cycleDays
}

export function getCycleStartsSortedByDate() {
  return db
    .objects('CycleDay')
    .filtered('isCycleStart = true')
    .sorted('date', true)
}
export function saveSymptom(symptom, date, val) {
  let cycleDay = getCycleDay(date)
  if (!cycleDay) cycleDay = createCycleDay(date)

  db.write(() => {
    if (symptom === 'bleeding') {
      const mensesDaysAfter = getMensesDaysRightAfter(cycleDay)
      maybeSetNewCycleStart({
        val,
        cycleDay,
        mensesDaysAfter,
        checkIsMensesStart,
      })
    } else {
      cycleDay[symptom] = val
    }
  })
}

export function updateCycleStartsForAllCycleDays() {
  db.write(() => {
    getBleedingDaysSortedByDate().forEach((day) => {
      if (checkIsMensesStart(day)) {
        day.isCycleStart = true
      }
    })
  })
}

export function createCycleDay(dateString) {
  let result
  db.write(() => {
    result = db.create('CycleDay', {
      date: dateString,
      isCycleStart: false,
    })
  })
  return result
}

export function getCycleDay(dateString) {
  return db.objectForPrimaryKey('CycleDay', dateString)
}

export function getPreviousTemperatureForDate(date) {
  const targetDate = LocalDate.parse(date)
  const winner = getTemperatureDaysSortedByDate().find((candidate) => {
    return LocalDate.parse(candidate.date).isBefore(targetDate)
  })
  if (!winner) return null
  return winner.temperature.value
}

function tryToCreateCycleDayFromImport(day, i) {
  try {
    // we cannot know this yet, gets detected afterwards
    day.isCycleStart = false
    db.create('CycleDay', day)
  } catch (err) {
    const msg = `Line ${i + 1}(${day.date}): ${err.message}`
    throw new Error(msg)
  }
}

export function getAmountOfCycleDays() {
  const cycleDaysSortedByDate = getCycleDaysSortedByDate()
  const amountOfCycleDays = cycleDaysSortedByDate.length
  if (!amountOfCycleDays) return 0
  const earliest = cycleDaysSortedByDate[amountOfCycleDays - 1]
  const today = LocalDate.now()
  const earliestAsLocalDate = LocalDate.parse(earliest.date)
  return earliestAsLocalDate.until(today, ChronoUnit.DAYS)
}

export function getSchema() {
  return db.schema.reduce((acc, curr) => {
    acc[curr.name] = curr.properties
    return acc
  }, {})
}

export function tryToImportWithDelete(cycleDays) {
  db.write(() => {
    db.delete(db.objects('CycleDay'))
    cycleDays.forEach(tryToCreateCycleDayFromImport)
  })
}

export function tryToImportWithoutDelete(cycleDays) {
  db.write(() => {
    cycleDays.forEach(processCycleDay)
  })
}

/* Processes each cycle day and updates existing data or creates new db entry
 *
 * @param {Object} day - the imported cycle day
 * @param {number} i - the index of the imported cycle day in the array
 */
function processCycleDay(day, i) {
  const existing = getCycleDay(day.date)

  if (existing) {
    updateExistingCycleDay(existing, day)
  } else {
    tryToCreateCycleDayFromImport(day, i)
  }
}

/* Compares entries for each cycle day.
 *  If no conflicts found, uses imported data. Otherwise handles conflicts.
 *
 * @param {Object} existing - the corresponding cycle day from db
 * @param {Object} day - the imported cycle day
 */
function updateExistingCycleDay(existing, day) {
  for (const entry in day) {
    if (existing[entry]) {
      updateEntry(existing, day, entry)
    } else {
      existing[entry] = day[entry]
    }
  }
}
/* Updates individual entries in case of an import conflict
 *
 * The symptoms behave differently when encountering a conflict.
 * For note the import note is appended
 * Bleeding uses the updated value and sets "exclude" if at least one of the two has "exclude" set.
 * For sex, pain and mood the entries for the symptoms are simply merged.
 * For cervix, mucus, temperature & desire, merging does not make sense, therefore the default of the imported value overwriting the "old" one is used.
 *
 * @param {Object} existing - the corresponding cycle day from db
 * @param {Object} day - the imported cycle day
 * @param {string} entry - the name of specific entry/symptom (sex, bleeding etc.)
 */
function updateEntry(existing, day, entry) {
  switch (entry) {
    case 'note':
      existing[entry]['value'] += ' ' + day[entry]['value']
      break
    case 'bleeding':
      existing[entry]['value'] = day[entry]['value']
      existing[entry]['exclude'] =
        existing[entry]['exclude'] || day[entry]['exclude']
      break
    case 'sex':
    case 'pain':
    case 'mood':
      mergeSubEntries(existing[entry], day[entry])
      break
    default:
      existing[entry] = day[entry]
  }
}
/* Merges sub-entries in symptoms.
 *
 * ATTENTION: This only makes sense in the case of symptoms where the schema is {"a": bool, "b": bool, ..., "note": string}
 *
 * @param {Object} existingEntry - the existing symptom entry for a given day
 * @param {Object} dayEntry - symptom entry to be merged (same symptom!)
 */
function mergeSubEntries(existingEntry, dayEntry) {
  for (const data in dayEntry) {
    if (data == 'note') {
      existingEntry[data] =
        (existingEntry[data] ? existingEntry[data] : ' ') + dayEntry[data]
    } else {
      existingEntry[data] = existingEntry[data] || dayEntry[data]
    }
  }
}

export async function changeDbEncryption(hash) {
  let key
  if (hash) key = hashToInt8Array(hash)
  const defaultPath = db.path
  const dir = db.path.split('/')
  dir.pop()
  dir.push('copied.realm')
  const copyPath = dir.join('/')
  const exists = await fs.exists(copyPath)
  if (exists) await fs.unlink(copyPath)
  db.writeCopyTo({ path: copyPath, encryptionKey: key })
  db.close()
  await fs.unlink(defaultPath)
  await fs.moveFile(copyPath, defaultPath)
}

export function isDbEmpty() {
  return db.empty
}

export async function deleteDbAndOpenNew() {
  const exists = await fs.exists(Realm.defaultPath)
  if (exists) await fs.unlink(Realm.defaultPath)
  await openDb()
}

export function clearDb() {
  db.write(db.deleteAll)
}

function hashToInt8Array(hash) {
  const key = new Uint8Array(64)
  for (let i = 0; i < key.length; i++) {
    const twoDigitHex = hash.slice(i * 2, i * 2 + 2)
    key[i] = parseInt(twoDigitHex, 16)
  }
  return key
}
