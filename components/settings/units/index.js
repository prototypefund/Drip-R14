import React, { useState } from 'react'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import Segment from '../../common/segment'

import { useImperialObservable, saveUseImperial } from '../../../local-storage'

import labels from '../../../i18n/en/settings'

const Settings = () => {
  const [shouldUseImperial, setShouldUseImperial] = useState(
    useImperialObservable.value
  )

  const onImperialToggle = (value) => {
    setShouldUseImperial(value)
    saveUseImperial(value)
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
