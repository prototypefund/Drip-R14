import React, { Component } from 'react'
import { Alert, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { saveSymptom } from '../../../db'
import { sharedDialogs as labels } from '../../../i18n/en/cycle-day'
import styles, { iconStyles } from '../../../styles'

export default class ActionButtonFooter extends Component {
  render() {
    const {
      symptom,
      currentSymptomValue,
      date,
      saveAction,
      saveDisabled,
      navigate,
      autoShowDayView = true
    } = this.props
    const navigateToOverView = () => navigate('CycleDay', { date })
    const buttons = [
      {
        title: labels.delete,
        action: () => {
          Alert.alert(labels.areYouSureTitle, labels.areYouSureToDelete, [
            {
              text: labels.cancel,
              style: 'cancel'
            },
            {
              text: labels.reallyDeleteData,
              onPress: () => {
                saveSymptom(symptom, date)
                navigateToOverView()
              }
            }
          ])
        },
        disabledCondition: !currentSymptomValue,
        icon: 'delete-outline'
      },
      {
        title: labels.save,
        action: () => {
          if (saveDisabled) {
            ToastAndroid.show(labels.disabledInfo, ToastAndroid.LONG)
          } else {
            saveAction()
            if (autoShowDayView) navigateToOverView()
          }
        },
        disabledCondition: saveDisabled,
        icon: 'content-save-outline'
      }
    ]
    return (
      <View style={styles.menu}>
        {buttons.map(({ title, action, disabledCondition, icon }, i) => {
          const textStyle = [styles.menuText]
          if (disabledCondition) {
            textStyle.push(styles.menuTextInActive)
          }

          const iconStyle = disabledCondition
            ? Object.assign(
                {},
                iconStyles.menuIcon,
                iconStyles.menuIconInactive
              )
            : iconStyles.menuIcon

          return (
            <TouchableOpacity
              onPress={action}
              style={styles.menuItem}
              key={i.toString()}
            >
              <Icon name={icon} {...iconStyle} />
              <Text style={textStyle}>{title.toLowerCase()}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}
