import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import AppText from './app-text'
import styles from '../styles/redesign'

export default function Button({ label, onPress, style, testID }) {
  const commonStyle = [styles.button, style]

  return (
    <TouchableOpacity onPress={onPress} style={commonStyle} testID={testID} >
      <AppText style={styles.buttonText}>{label}</AppText>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  testID: PropTypes.string,
}
