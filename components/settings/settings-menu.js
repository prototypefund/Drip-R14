import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import settingsLabels from '../../i18n/en/settings'
import styles from '../../styles/index'
import AppText from '../app-text'

const labels = settingsLabels.menuTitles

const menu = [
  { title: labels.reminders, component: 'Reminders' },
  { title: labels.nfpSettings, component: 'NfpSettings' },
  { title: labels.dataManagement, component: 'DataManagement' },
  { title: labels.password, component: 'Password' },
  { title: labels.about, component: 'About' },
  { title: labels.license, component: 'License' }
]

export default function SettingsMenu(props) {
  return <ScrollView>{menu.map(menuItem)}</ScrollView>

  function menuItem(item) {
    return (
      <TouchableOpacity
        style={styles.framedSegment}
        key={item.title}
        onPress={() => props.navigate(item.component)}
      >
        <AppText>{item.title.toLowerCase()}</AppText>
      </TouchableOpacity>
    )
  }
}
