import Realm from 'realm'
import { LocalDate } from 'js-joda'


const TemperatureSchema = {
  name: 'Temperature',
  properties: {
    value: 'double',
    exclude: 'bool'
  }
}

const BleedingSchema = {
  name: 'Bleeding',
  properties: {
    value: 'int',
    exclude: 'bool'
  }
}

const MucusSchema = {
  name: 'Mucus',
  properties: {
    feeling: 'int',
    texture: 'int',
    computedNfp: 'int',
    exclude: 'bool'
  }
}

const CycleDaySchema = {
  name: 'CycleDay',
  primaryKey: 'date',
  properties: {
    date: 'string',
    temperature: {
      type: 'Temperature',
      optional: true
    },
    bleeding: {
      type: 'Bleeding',
      optional: true
    },
    mucus: {
      type: 'Mucus',
      optional: true
    }
  }
}

const db = new Realm({
  schema: [
    CycleDaySchema,
    TemperatureSchema,
    BleedingSchema,
    MucusSchema
  ],
  // we only want this in dev mode
  deleteRealmIfMigrationNeeded: true
})

const bleedingDaysSortedByDate = db.objects('CycleDay').filtered('bleeding != null').sorted('date', true)
const temperatureDaysSortedByDate = db.objects('CycleDay').filtered('temperature != null').sorted('date', true)

function saveTemperature(cycleDay, temperature) {
  db.write(() => {
    cycleDay.temperature = temperature
  })
}

const cycleDaysSortedByDate = db.objects('CycleDay').sorted('date', true)

function saveBleeding(cycleDay, bleeding) {
  db.write(() => {
    cycleDay.bleeding = bleeding
  })
}

function saveMucus(cycleDay, mucus) {
  db.write(() => {
    cycleDay.mucus = mucus
  })
}

function getOrCreateCycleDay(localDate) {
  let result = db.objectForPrimaryKey('CycleDay', localDate)
  if (!result) {
    db.write(() => {
      result = db.create('CycleDay', {
        date: localDate
      })
    })
  }
  return result
}

function getCycleDay(localDate) {
  return db.objectForPrimaryKey('CycleDay', localDate)
}

function deleteAll() {
  db.write(() => {
    db.deleteAll()
  })
}

function getPreviousTemperature(cycleDay) {
  cycleDay.wrappedDate = LocalDate.parse(cycleDay.date)
  const winner = temperatureDaysSortedByDate.find(day => {
    const wrappedDate = LocalDate.parse(day.date)
    return wrappedDate.isBefore(cycleDay.wrappedDate)
  })
  if (!winner) return null
  return winner.temperature.value
}

export {
  saveTemperature,
  saveBleeding,
  saveMucus,
  getOrCreateCycleDay,
  bleedingDaysSortedByDate,
  temperatureDaysSortedByDate,
  cycleDaysSortedByDate,
  deleteAll,
  getPreviousTemperature,
  getCycleDay
}
