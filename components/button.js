import React from 'react'
import { TouchableOpacity } from 'react-native'

import styles from '../styles'
import AppText from './app-text'

export default function Button(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.button,
        props.style,
        { backgroundColor: props.backgroundColor }
      ]}
    >
      <AppText style={styles.homeButtonText}>{props.children}</AppText>
    </TouchableOpacity>
  )
}
