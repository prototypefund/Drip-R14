import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import labels from '../../i18n/en/settings'
import styles from '../../styles/index'
import AppText from '../app-text'

export default class License extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.framedSegment}>
          <AppText style={styles.framedSegmentTitle}>{`${
            labels.license.title
          } `}</AppText>
          <AppText>{`${labels.license.text} `}</AppText>
        </View>
      </ScrollView>
    )
  }
}
