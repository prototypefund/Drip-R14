import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { Typography } from '../../styles'
import { useNavigation } from '../../hooks/useNavigation'

const MenuItem = ({ item, closeMenu }) => {
  const { component, name } = item
  const { navigate } = useNavigation()
  const onPress = () => {
    closeMenu()
    navigate(component)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{name}</AppText>
    </TouchableOpacity>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,

  closeMenu: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  text: {
    ...Typography.subtitle,
  },
})

export default MenuItem
