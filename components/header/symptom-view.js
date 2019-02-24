import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import styles, { iconStyles } from '../../styles'
import formatDate from '../helpers/format-date'
import NavigationArrow from './navigation-arrow'

export default function SymptomViewHeader(props) {
  return (
    <View style={[styles.header, styles.headerCycleDay, styles.headerSymptom]}>
      <View
        style={styles.accentCircle}
        left={props.middle - styles.accentCircle.width / 2}
      />
      <NavigationArrow direction="left" {...props} />
      <View>
        <Text style={styles.dateHeader}>{props.title}</Text>
        <Text style={styles.cycleDayNumber}>{formatDate(props.date)}</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.goToSymptomInfo()}
        style={styles.infoButton}
      >
        <FeatherIcon
          name="info"
          style={styles.symptomInfoIcon}
          {...iconStyles.symptomHeaderIcons}
        />
      </TouchableOpacity>
    </View>
  )
}
