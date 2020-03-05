import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'

import AppText from '../app-text'

import styles from '../../styles'

export default function SelectBoxGroup(props) {
  return (
    <View style={styles.selectBoxSection}>
      {Object.keys(props.labels).map(key => {
        const style = [styles.selectBox]
        const textStyle = []
        if (props.optionsState[key]) {
          style.push(styles.selectBoxActive)
          textStyle.push(styles.selectBoxTextActive)
        }
        return (
          <TouchableOpacity
            onPress={() => props.onSelect(key)}
            key={key}
          >
            <View style={style}>
              <AppText style={textStyle}>{props.labels[key]}</AppText>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

SelectBoxGroup.propTypes = {
  labels: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  optionsState: PropTypes.object.isRequired
}
