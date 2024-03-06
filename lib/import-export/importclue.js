import fetch from 'node-fetch'
import { NetworkError, ParsingError, AuthenticationError } from './ErrorTypes'
const apiUrlToken = 'https://api.helloclue.com/access-tokens'
const apiUrlData = 'https://api.helloclue.com/v1/measurements'

let accessToken
let nextCursor = ''
const periodData = []
const timeoutms = 5000

function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new NetworkError('Request timed out')), ms)
  )
}

const blank = {
  date: null,
  bleeding: {
    exclude: null,
    value: null,
  },
  cervix: {
    exclude: null,
    firmness: null,
    opening: null,
    position: null,
  },
  desire: {
    value: null,
  },
  mood: {
    happy: null,
    sad: null,
    stressed: null,
    balanced: null,
    fine: null,
    anxious: null,
    energetic: null,
    fatigue: null,
    angry: null,
    other: null,
    note: '',
  },
  mucus: {
    exclude: null,
    feeling: null,
    texture: null,
    value: null,
  },
  note: {
    value: '',
  },
  pain: {
    cramps: null,
    ovulationPain: null,
    headache: null,
    backache: null,
    nausea: null,
    tenderBreasts: null,
    migraine: null,
    other: null,
    note: '',
  },
  sex: {
    solo: null,
    partner: null,
    condom: null,
    pill: null,
    iud: null,
    patch: null,
    ring: null,
    implant: null,
    diaphragm: null,
    none: null,
    other: null,
    note: '',
  },
  temperature: {
    exclude: null,
    note: '',
    time: null,
    value: null,
  },
}

const authenticate = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  }

  const response = await Promise.race([
    fetch(apiUrlToken, requestOptions),
    timeout(timeoutms),
  ])

  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthenticationError()
    } else {
      throw new Error('Something seems to have gone wrong. ')
    }
  }

  const data = await response.json()
  accessToken = data['access_token']
  return accessToken
}
/**
 *
 * @returns {{result: Error}}
 */
const fetchData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`,
    },
  }

  try {
    const response = await Promise.race([
      fetch(apiUrlData, requestOptions),
      timeout(timeoutms),
    ])

    if (!response.ok) {
      throw new NetworkError(
        `Network response was not ok: ${response.statusText}`
      )
    }

    const data = await response.json()
    periodData.push(...data['measurements'])
    nextCursor = data['nextCursor']
  } catch (error) {
    if (error instanceof NetworkError) {
      throw new NetworkError('Network could not be reached.')
    }
    throw new ParsingError(error.message)
  }

  while (nextCursor !== '') {
    try {
      const response = await Promise.race([
        fetch(apiUrlData + `?cursor=${nextCursor}`, requestOptions),
        timeout(timeoutms),
      ])

      if (!response.ok) {
        throw new NetworkError(
          `Network response was not ok: ${response.statusText}`
        )
      }

      const data = await response.json()
      periodData.push(...data['measurements'])
      nextCursor = data['nextCursor']
    } catch (error) {
      if (error instanceof NetworkError) {
        throw new NetworkError('Network could not be reached.')
      }
      throw new ParsingError(error.message)
    }
  }
  return JSON.stringify(periodData)
}
/**
 *
 * @param data
 * @returns {{result: Error}}
 */
const combineIntoDate = async (data) => {
  const groupedData = data.reduce((result, item) => {
    const date = item.date

    if (!result[date]) {
      result[date] = []
    }

    result[date].push(item)

    return result
  }, {})

  return JSON.stringify(groupedData, null, 2)
}
/**
 *
 * @param groupedData
 * @returns {{result: Error}}
 */
const parseToDrip = async (groupedData) => {
  const data = []

  for (const dateKey in groupedData) {
    const blankCopy = JSON.parse(JSON.stringify(blank))
    blankCopy.date = dateKey
    for (const symptomKey in groupedData[dateKey]) {
      const symptom = groupedData[dateKey][symptomKey]
      switch (symptom.type) {
        case 'sex_life':
          for (const v in symptom.value) {
            switch (symptom.value[v].option) {
              case 'masturbation':
                blankCopy.sex.solo = true
                break
              case 'protected':
                blankCopy.sex.other = true
                blankCopy.sex.note +=
                  'Unspecified contraception method (Clue import)'
                break
              case 'high_sex_drive':
                blankCopy.desire.value = 2
                break
              case 'low_sex_drive':
                blankCopy.desire.value = 0
                break
              default:
                break
            }
          }
          break
        case 'spotting':
          blankCopy.bleeding.value = 0
          blankCopy.bleeding.exclude = false
          break
        case 'period':
          blankCopy.bleeding.exclude = false
          switch (symptom.value.option) {
            case 'light':
              blankCopy.bleeding.value = 1
              break
            case 'medium':
              blankCopy.bleeding.value = 2
              break
            case 'very_heavy':
              blankCopy.note.value += 'Indicated very heavy bleeding'
            // eslint-disable-next-line no-fallthrough
            case 'heavy':
              blankCopy.bleeding.value = 3
              break
            default:
              break
          }
          break
        case 'mind':
          for (const v in symptom.value) {
            switch (symptom.value[v].option) {
              case 'calm':
                blankCopy.mood.balanced = true
                break
              case 'stressed':
                blankCopy.mood.stressed = true
                break
              default:
                blankCopy.mood.other = true
                blankCopy.mood.note += symptom.value[v].option
                break
            }
            break
          }
          break
        case 'pain':
          for (const v in symptom.value) {
            switch (symptom.value[v].option) {
              case 'period_cramps':
                blankCopy.pain.cramps = true
                break
              case 'ovulation':
                blankCopy.pain.ovulationPain = true
                break
              case 'breast_tenderness':
                blankCopy.pain.tenderBreasts = true
                break
              case 'headache':
                blankCopy.pain.headache = true
                break
              case 'migraine':
              case 'migraine_with_aura':
                blankCopy.pain.migraine = true
                break
              case 'lower_back':
                blankCopy.pain.backache = true
                break
              default:
                blankCopy.pain.other = true
                blankCopy.pain.note += `Pain: ${symptom.value[v].option}`
            }
          }
          break
        case 'bbt':
          blankCopy.temperature.value = symptom.value.celsius
          blankCopy.temperature.exclude = symptom.value.excluded
          break
        case 'tags':
          // convert to note at a later point
          break
        case 'collection_method':
          // use later, when this is integrated into drip
          break
        case 'energy':
          for (const v in symptom.value) {
            switch (symptom.value[v].option) {
              case 'exhausted':
              case 'tired':
                blankCopy.mood.fatigue = true
                break
              case 'energetic':
              case 'fully_energized':
                blankCopy.mood.energetic = true
                break
              case 'ok':
                blankCopy.mood.note = 'OK'
                break
              default:
                break
            }
          }
          break
        case 'feelings':
          for (const v in symptom.value) {
            switch (symptom.value[v].option) {
              case 'confident':
              case 'excited':
              case 'grateful':
                blankCopy.mood.other = true
                blankCopy.mood.note += symptom.value[v].option
              // eslint-disable-next-line no-fallthrough
              case 'happy':
                blankCopy.mood.happy = true
                break
              case 'sad':
                blankCopy.mood.sad = true
                break
              case 'irritable':
                blankCopy.mood.other = true
                blankCopy.mood.note += symptom.value[v].option
              // eslint-disable-next-line no-fallthrough
              case 'angry':
                blankCopy.mood.angry = true
                break
              case 'anxious':
                blankCopy.mood.anxious = true
                break
              default:
                blankCopy.mood.other = true
                blankCopy.mood.note += symptom.value[v].option
                break
            }
          }
          break
        case 'discharge':
          blankCopy.mucus.exclude = false
          for (const v in symptom.value) {
            switch (symptom.value[v].option) {
              case 'none':
                blankCopy.mucus.texture = 0
                break
              case 'creamy':
                blankCopy.mucus.texture = 1
                break
              case 'egg_white':
                blankCopy.mucus.texture = 2
                break
              default:
                blankCopy.note.value += `Discharge: ${symptom.value[v].option}`
                break
            }
          }
          break
        default:
          break
      }
    }
    data.push(blankCopy)
  }
  return data
}
/**
 *
 * @param cycleDays
 * @returns {{result: Error}}
 */
const transformToCsv = async (cycleDays) => {
  const columnNames =
    'date,temperature.value,temperature.exclude,temperature.time,temperature.note,bleeding.value,bleeding.exclude,mucus.feeling,mucus.texture,mucus.value,mucus.exclude,cervix.opening,cervix.firmness,cervix.position,cervix.exclude,note.value,desire.value,sex.solo,sex.partner,sex.condom,sex.pill,sex.iud,sex.patch,sex.ring,sex.implant,sex.diaphragm,sex.none,sex.other,sex.note,pain.cramps,pain.ovulationPain,pain.headache,pain.backache,pain.nausea,pain.tenderBreasts,pain.migraine,pain.other,pain.note,mood.happy,mood.sad,mood.stressed,mood.balanced,mood.fine,mood.anxious,mood.energetic,mood.fatigue,mood.angry,mood.other,mood.note'.split(
      ','
    )
  const replacer = function (key, value) {
    return value === null ? undefined : value
  }
  let csvString = ''
  const csv = cycleDays.map(function (day) {
    return columnNames
      .map(function (fieldName) {
        const splitFieldName = fieldName.split('.')
        if (splitFieldName[1] !== undefined)
          return JSON.stringify(
            day[splitFieldName[0]][splitFieldName[1]],
            replacer
          )
        else {
          return JSON.stringify(day[splitFieldName[0]], replacer)
        }
      })
      .join(',')
  })
  csvString = columnNames.join(',') // add header column
  csv.forEach((row) => {
    csvString += '\n'
    csvString += row
  })
  return csvString
}

export { authenticate, fetchData, combineIntoDate, parseToDrip, transformToCsv }
