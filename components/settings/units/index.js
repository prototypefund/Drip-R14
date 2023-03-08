import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import Segment from '../../common/segment'

import { Spacing, Typography } from '../../../styles'
import labels from '../../../i18n/en/settings'

const Settings = () => {
  const [shouldUseImperial, setShouldUseImperial] = useState(
    useImperialObservable.value
  )

  const onImperialToggle = (value) => {
    setShouldUseImperial(value)
    shouldUseImperial(value)
  }

  const imperialText = shouldUseImperial
    ? labels.useImperial.imperialModeOn
    : labels.useImperial.imperialModeOff

  return (
    <AppPage>
      <Segment title={labels.useImperial.title} last>
        <AppSwitch
          onToggle={onImperialToggle}
          text={imperialText}
          value={shouldUseImperial}
        />
      </Segment>
    </AppPage>
  )
}

export default Settings

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
