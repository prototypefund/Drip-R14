import React from 'react'
import { BackHandler, ScrollView, View } from 'react-native'

import { shared } from '../i18n/en/labels'
import settingsLabels from '../i18n/en/settings'
import { saveLicenseFlag } from '../local-storage'
import styles, { secondaryColor } from '../styles'
import AppText from './app-text'
import Button from './button'

const labels = settingsLabels.license
export default function License({ setLicense }) {
  return (
    <ScrollView style={styles.licensePage}>
      <AppText style={styles.framedSegmentTitle}>{labels.title}</AppText>
      <AppText>{labels.text}</AppText>
      <View style={styles.licenseButtons}>
        <Button
          style={styles.licenseButton}
          backgroundColor={'grey'}
          onPress={() => BackHandler.exitApp()}
        >
          {shared.cancel}
        </Button>
        <Button
          style={styles.licenseButton}
          backgroundColor={secondaryColor}
          onPress={async () => {
            await saveLicenseFlag()
            setLicense()
          }}
        >
          {shared.ok}
        </Button>
      </View>
    </ScrollView>
  )
}
