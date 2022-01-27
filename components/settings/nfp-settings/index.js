import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import AppIcon from '../../common/app-icon'
import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import AppText from '../../common/app-text'
import TemperatureSlider from './temperature-slider'
import Segment from '../../common/segment'
import TemperatureReminder from '../reminders/temperature-reminder'

import {
  useCervixObservable,
  saveUseCervix,
  fertilityTrackObservable,
  saveFertilityTrack,
} from '../../../local-storage'
import { Colors, Spacing, Typography } from '../../../styles'
import labels from '../../../i18n/en/settings'

var tempReminder

export default class Settings extends Component {
  constructor(props) {
    super(props)

    tempReminder = new TemperatureReminder()

    this.state = {
      shouldUseCervix: useCervixObservable.value,
      isFertilityTrackEnabled: fertilityTrackObservable.value,
    }
  }

  onCervixToggle = (value) => {
    this.setState({ shouldUseCervix: value })
    saveUseCervix(value)
  }

  onFertilityToggle = (value) => {
    this.setState({ isFertilityTrackEnabled: value })
    saveFertilityTrack(value)
    tempReminder.temperatureReminderToggle(false)
  }

  render() {
    const { shouldUseCervix, isFertilityTrackEnabled } = this.state
    const cervixText = shouldUseCervix
      ? labels.useCervix.cervixModeOn
      : labels.useCervix.cervixModeOff

    return (
      <AppPage>
        <Segment title={labels.fertilityTrack.title}>
          <AppSwitch
            onToggle={this.onFertilityToggle}
            text={labels.fertilityTrack.fertilityEnable}
            value={isFertilityTrackEnabled}
          />
        </Segment>
        {isFertilityTrackEnabled && (
          <Segment title={labels.useCervix.title}>
            <AppSwitch
              onToggle={this.onCervixToggle}
              text={cervixText}
              value={shouldUseCervix}
            />
          </Segment>
        )}
        {isFertilityTrackEnabled && (
          <Segment title={labels.tempScale.segmentTitle}>
            <AppText>{labels.tempScale.segmentExplainer}</AppText>
            <TemperatureSlider />
          </Segment>
        )}
        {isFertilityTrackEnabled && (
          <Segment last>
            <View style={styles.line}>
              <AppIcon
                color={Colors.purple}
                name="info-with-circle"
                style={styles.icon}
              />
              <AppText style={styles.title}>{labels.preOvu.title}</AppText>
            </View>
            <AppText>{labels.preOvu.note}</AppText>
          </Segment>
        )}
      </AppPage>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Spacing.base,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Typography.subtitle,
  },
})
