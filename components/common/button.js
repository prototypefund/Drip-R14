import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'

import AppIcon from './app-icon'
import AppText from './app-text'

import { Colors, Fonts, Sizes, Spacing } from '../../styles'

// ENUM for ButtonTypes
export const ButtonTypes = {
  REGULAR: 'REGULAR',
  CTA: 'CTA',
  ACTION: 'ACTION',
  ACTION_CTA: 'ACTION_CTA',
}

const Button = ({
  children,
  iconName,
  isCTA,
  isSmall,
  onPress,
  buttonStyle,
  testID,
  ...props
}) => {
  let buttonStyleProp = styles.regular
  switch (buttonStyle) {
    case ButtonTypes.CTA:
      buttonStyleProp = styles.cta
      break
    case ButtonTypes.ACTION:
      buttonStyleProp = styles.action
      break
    case ButtonTypes.ACTION_CTA:
      buttonStyleProp = styles.actionCTA
      break
    default:
      buttonStyleProp = isCTA ? styles.cta : styles.regular
  }
  const textCTA = isCTA ? styles.buttonTextBold : styles.buttonTextRegular
  const textStyle = [textCTA, isSmall ? textSmall : text]

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyleProp}
      testID={testID}
      {...props}
    >
      <AppText style={textStyle}>{children}</AppText>
      {iconName && <AppIcon color={Colors.orange} name={iconName} />}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  iconName: PropTypes.string,
  isCTA: PropTypes.bool,
  isSmall: PropTypes.bool,
  buttonStyle: PropTypes.string,
  onPress: PropTypes.func,
  testID: PropTypes.string,
}

Button.defaultProps = {
  isSmall: true,
  buttonStyle: ButtonTypes.REGULAR,
}

const text = {
  padding: Spacing.base,
  textTransform: 'uppercase',
}

const textSmall = {
  fontSize: Sizes.small,
  padding: Spacing.small,
  textTransform: 'uppercase',
}

const button = {
  alignItems: 'center',
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: Spacing.base,
  paddingHorizontal: Spacing.tiny,
  minWidth: '15%',
}

const styles = StyleSheet.create({
  regular: {
    ...button,
  },
  cta: {
    backgroundColor: Colors.orange,
    borderRadius: 25,
    ...button,
  },
  action: {
    ...button,
    marginTop: 0,
  },
  actionCTA: {
    ...button,
    backgroundColor: Colors.orange,
    borderRadius: 25,
    marginTop: 0,
  },
  buttonTextBold: {
    color: 'white',
    fontFamily: Fonts.bold,
  },
  buttonTextRegular: {
    color: Colors.greyDark,
    fontFamily: Fonts.main,
  },
})

export default Button
