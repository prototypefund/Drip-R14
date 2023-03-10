import AsyncStorage from '@react-native-async-storage/async-storage'
import Observable from 'obv'
import {
  TEMP_SCALE_MIN_C,
  TEMP_SCALE_MAX_C,
  TEMP_SCALE_MIN_F,
  TEMP_SCALE_MAX_F,
  TEMP_SCALE_UNITS,
  TEMP_MIN_F,
  TEMP_MAX_C,
} from './config'

export const scaleObservable = Observable()
setObvWithInitValue('tempScale', scaleObservable, {
  min: TEMP_SCALE_MIN_C,
  max: TEMP_SCALE_MAX_C,
})
scaleObservable((scale) => {
  const scaleRange = scale.max - scale.min
  if (scaleRange <= 1.5) {
    unitObservable.set(0.1)
  } else {
    unitObservable.set(0.5)
  }
})

export const unitObservable = Observable()
unitObservable.set(TEMP_SCALE_UNITS)

export async function saveTempScale(scale) {
  await AsyncStorage.setItem('tempScale', JSON.stringify(scale))
  scaleObservable.set(scale)
}

export const tempReminderObservable = Observable()
setObvWithInitValue('tempReminder', tempReminderObservable, {
  enabled: false,
})

export async function saveTempReminder(reminder) {
  await AsyncStorage.setItem('tempReminder', JSON.stringify(reminder))
  tempReminderObservable.set(reminder)
}

export const periodReminderObservable = Observable()
setObvWithInitValue('periodReminder', periodReminderObservable, {
  enabled: false,
})

export async function savePeriodReminder(reminder) {
  await AsyncStorage.setItem('periodReminder', JSON.stringify(reminder))
  periodReminderObservable.set(reminder)
}

export const useCervixObservable = Observable()
setObvWithInitValue('useCervix', useCervixObservable, false)

export async function saveUseCervix(bool) {
  await AsyncStorage.setItem('useCervix', JSON.stringify(bool))
  useCervixObservable.set(bool)
}

const translateTemperature = (temperature, to_f) => {
  if (to_f && temperature < TEMP_MIN_F) {
    temperature = 1.8 * temperature + 32
  }

  if (!to_f && temperature > TEMP_MAX_C) {
    temperature = (5 / 9) * (temperature - 32.0)
  }
  return temperature
}

export const checkImperialArray = (data) => {
  if (data) {
    const new_data = JSON.parse(JSON.stringify(data))
    for (const row of new_data) {
      if (row.temperature?.value) {
        row.temperature.value = translateTemperature(
          row.temperature.value,
          useImperialObservable.value
        )
      }
    }
    return JSON.stringify(new_data)
  }
  return data
}

export const checkImperial = (data) => {
  if (data) {
    const new_data = JSON.parse(JSON.stringify(data))
    if (new_data?.temperature?.value) {
      new_data.temperature.value = translateTemperature(
        new_data.temperature.value,
        useImperialObservable.value
      )
    }
    return new_data
  }
  return data
}

export const useImperialObservable = Observable()
setObvWithInitValue('useImperial', useImperialObservable, false)

export async function saveUseImperial(bool) {
  await AsyncStorage.setItem('useImperial', JSON.stringify(bool))
  useImperialObservable.set(bool)
  saveTempScale({
    min: useImperialObservable.value ? TEMP_SCALE_MIN_F : TEMP_SCALE_MIN_C,
    max: useImperialObservable.value ? TEMP_SCALE_MAX_F : TEMP_SCALE_MAX_C,
  })
}

export const hasEncryptionObservable = Observable()
setObvWithInitValue('hasEncryption', hasEncryptionObservable, false)

export async function saveEncryptionFlag(bool) {
  await AsyncStorage.setItem('hasEncryption', JSON.stringify(bool))
  hasEncryptionObservable.set(bool)
}

export async function getLicenseFlag() {
  return AsyncStorage.getItem('agreedToLicense')
}

export async function saveLicenseFlag() {
  await AsyncStorage.setItem('agreedToLicense', JSON.stringify(true))
}

export async function getChartFlag() {
  const isFirstChartView = await AsyncStorage.getItem('isFirstChartView')
  return isFirstChartView === null ? 'true' : isFirstChartView
}

export async function setChartFlag() {
  await AsyncStorage.setItem('isFirstChartView', JSON.stringify(false))
}

async function setObvWithInitValue(key, obv, defaultValue) {
  const result = await AsyncStorage.getItem(key)
  let value
  if (result) {
    value = JSON.parse(result)
  } else {
    value = defaultValue
  }
  obv.set(value)
}
