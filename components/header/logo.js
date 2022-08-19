import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'

import { Colors, Fonts, Sizes } from '../../styles'
import { useNavigation } from '../../hooks/useNavigation'

const Logo = () => {
  const { navigate } = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigate('Home')}>
      <AppText style={styles.logo}>drip.</AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  logo: {
    color: Colors.turquoiseDark,
    fontFamily: Fonts.bold,
    fontSize: Sizes.title,
  },
})

export default Logo
