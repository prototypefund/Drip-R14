import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'

import AppIcon from './app-icon'

import { HIT_SLOP} from '../../config'
import { Colors, Sizes } from '../../styles'

const CloseIcon = ({ onClose, ...props }) => {
  return (
    <TouchableOpacity
      hitSlop={HIT_SLOP}
      onPress={onClose}
      style={styles.container}
      {...props}
    >
      <AppIcon name='cross' color={Colors.orange} />
    </TouchableOpacity>
  )
}

CloseIcon.propTypes = {
  onClose: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginBottom: Sizes.base
  }
})

export default CloseIcon
