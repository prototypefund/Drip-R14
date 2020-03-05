import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import AppText from './app-text'
import styles from '../styles'

export default function Button(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.button,
        props.style,
        {backgroundColor: props.backgroundColor}
      ]}
      testID={props.testID}
    >
      <AppText style={styles.homeButtonText}>
        {props.children}
      </AppText>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onPress: PropTypes.func,
  numberOfLines: PropTypes.number,
  style: PropTypes.object,
  testID: PropTypes.string
}
