import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import styles from '../../../styles'
import AppText from '../../app-text'

const SettingsButton = ({ children, style, secondary, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.settingsButton,
        secondary ? null : styles.settingsButtonAccent,
        props.disabled ? styles.settingsButtonDisabled : null,
        style
      ]}
      {...props}
    >
      <AppText
        style={
          secondary
            ? styles.settingsButtonSecondaryText
            : styles.settingsButtonText
        }
      >
        {children}
      </AppText>
    </TouchableOpacity>
  )
}

SettingsButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default SettingsButton
