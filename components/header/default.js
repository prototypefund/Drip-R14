import React from 'react'
import { Text, View } from 'react-native'

import styles from '../../styles'

export default function DefaultHeader(props) {
  return (
    <View style={styles.header}>
      <View style={styles.accentCircle} />
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  )
}
