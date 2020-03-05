import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import styles from "../styles"
import Link from './link'

export default function AppText(props) {
  // we parse for links in case the text contains any
  return (
    <Link>
      <Text
        style={[styles.appText, props.style]}
        onPress={props.onPress}
        numberOfLines={props.numberOfLines}
      >
        {props.children}
      </Text>
    </Link>
  )
}

AppText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onPress: PropTypes.func,
  numberOfLines: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
