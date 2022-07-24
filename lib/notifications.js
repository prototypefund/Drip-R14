import {
  tempReminderObservable,
  periodReminderObservable,
} from '../local-storage'
import Notification from 'react-native-push-notification'
import { DateTime } from 'luxon'
import { LocalDate } from 'js-joda'

import labels from '../i18n/en/settings'
import { getBleedingDaysSortedByDate } from '../db'
import cycleModule from './cycle'
import nothingChanged from '../db/db-unchanged'
import store from '../store'
import { setDate } from '../slices/date'

export default function setupNotifications(navigate) {
  Notification.configure({
    onNotification: (notification) => {
      // https://github.com/zo0r/react-native-push-notification/issues/966#issuecomment-479069106
      if (notification.data?.id === '1' || notification.id === '1') {
        const todayDate = LocalDate.now().toString()
        store.dispatch(setDate(todayDate))
        navigate('TemperatureEditView')
      } else {
        navigate('Home')
      }
    },
  })

  tempReminderObservable((reminder) => {
    Notification.cancelLocalNotifications({ id: '1' })
    if (reminder.enabled) {
      const [hours, minutes] = reminder.time.split(':')
      let target = new DateTime().set({
        hour: parseInt(hours),
        minute: parseInt(minutes),
        second: 0,
      })

      if (target < DateTime.now()) {
        target = target.plus({ day: 1 })
      }

      Notification.localNotificationSchedule({
        id: '1',
        userInfo: { id: '1' },
        message: labels.tempReminder.notification,
        date: target.toJSDate(),
        vibrate: false,
        repeatType: 'day',
      })
    }
  }, false)

  periodReminderObservable((reminder) => {
    Notification.cancelLocalNotifications({ id: '2' })
    if (reminder.enabled) setupPeriodReminder()
  }, false)

  getBleedingDaysSortedByDate().addListener((_, changes) => {
    // the listener fires on setup, so we check if there were actually any changes
    if (nothingChanged(changes)) return
    Notification.cancelLocalNotifications({ id: '2' })
    if (periodReminderObservable.value.enabled) setupPeriodReminder()
  })
}

function setupPeriodReminder() {
  const bleedingPrediction = cycleModule().getPredictedMenses()
  if (bleedingPrediction.length > 0) {
    const predictedBleedingStart = DateTime.fromFormat(
      bleedingPrediction[0][0],
      'yyyy-MM-dd'
    )
    // 3 days before and at 6 am
    const reminderDate = predictedBleedingStart.minus({ day: 3 }).set({
      hour: 6,
      minute: 0,
      second: 0,
    })

    if (reminderDate > DateTime.now()) {
      // period is likely to start in 3 to 3 + (length of prediction - 1) days
      const daysToEndOfPrediction = bleedingPrediction[0].length + 2

      Notification.localNotificationSchedule({
        id: '2',
        userInfo: { id: '2' },
        message: labels.periodReminder.notification(daysToEndOfPrediction),
        date: reminderDate.toJSDate(),
        vibrate: false,
      })
    }
  }
}
