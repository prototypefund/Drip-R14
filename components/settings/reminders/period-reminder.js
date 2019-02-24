import React, { Component } from 'react'
import { Switch, View } from 'react-native'

import labels from '../../../i18n/en/settings'
import {
  periodReminderObservable,
  savePeriodReminder
} from '../../../local-storage'
import AppText from '../../app-text'

export default class PeriodReminderPicker extends Component {
  constructor(props) {
    super(props)
    this.state = periodReminderObservable.value
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <AppText>{labels.periodReminder.reminderText}</AppText>
        </View>
        <Switch
          value={this.state.enabled}
          onValueChange={switchOn => {
            this.setState({ enabled: switchOn })
            savePeriodReminder({ enabled: switchOn })
          }}
        />
      </View>
    )
  }
}
