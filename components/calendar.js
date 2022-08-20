import React, { useEffect, useState } from 'react'

import { StyleSheet, View } from 'react-native'
import { CalendarList } from 'react-native-calendars'

import { getBleedingDaysSortedByDate } from '../db'
import cycleModule from '../lib/cycle'
import nothingChanged from '../db/db-unchanged'
import {
  calendarTheme,
  predictionToCalFormat,
  toCalFormat,
  todayToCalFormat,
} from './helpers/calendar'
import { useDate } from '../hooks/useDate'
import { useNavigation } from '../hooks/useNavigation'

const CalendarView = () => {
  const { setDate } = useDate()
  const { navigate } = useNavigation()
  const bleedingDays = getBleedingDaysSortedByDate()
  const predictedMenses = cycleModule().getPredictedMenses()
  const [bleedingDaysInCalFormat, setBleedingDaysInCalFormat] = useState(
    toCalFormat(bleedingDays)
  )
  const [
    predictedBleedingDaysInCalFormat,
    setPredictedBleedingDaysInCalFormat,
  ] = useState(predictionToCalFormat(predictedMenses))

  const setStateWithCalFormattedDays = (_, changes) => {
    if (nothingChanged(changes)) return
    const predictedMenses = cycleModule().getPredictedMenses()
    setBleedingDaysInCalFormat(toCalFormat(bleedingDays))
    setPredictedBleedingDaysInCalFormat(predictionToCalFormat(predictedMenses))
  }

  useEffect(() => {
    bleedingDays.addListener(setStateWithCalFormattedDays)
    return () => {
      bleedingDays.removeListener(setStateWithCalFormattedDays)
    }
  }, [])

  const markedDates = Object.assign(
    {},
    todayToCalFormat(),
    bleedingDaysInCalFormat,
    predictedBleedingDaysInCalFormat
  )

  return (
    <View style={styles.container}>
      <CalendarList
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        onDayPress={({ dateString }) => {
          setDate(dateString)
          navigate('CycleDay')
        }}
        markedDates={markedDates}
        markingType="custom"
        theme={calendarTheme}
        // Max amount of months allowed to scroll to the past.
        pastScrollRange={120}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

export default CalendarView
