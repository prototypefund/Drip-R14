import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import labels from '../../../i18n/en/settings'
import FramedSegment from '../../framed-segment'
import PeriodReminderPicker from './period-reminder'
import TempReminderPicker from './temp-reminder-picker'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
        <FramedSegment title={labels.tempReminder.title}>
          <TempReminderPicker />
        </FramedSegment>
        <FramedSegment title={labels.periodReminder.title}>
          <PeriodReminderPicker />
        </FramedSegment>
      </ScrollView>
    )
  }
}
