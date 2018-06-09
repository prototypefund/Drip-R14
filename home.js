import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import cycleDayModule from './get-cycle-day-number'
import { bleedingDaysSortedByDate, deleteAll } from './db'
import { LocalDate } from 'js-joda'

const getCycleDayNumber = cycleDayModule(bleedingDaysSortedByDate)

export default class Home extends Component {
  constructor(props) {
    super(props)
    const now = new Date()
    this.todayDateString = LocalDate.of(now.getFullYear(), now.getMonth() + 1, now.getDate()).toString()
    const cycleDayNumber = getCycleDayNumber(this.todayDateString)

    this.state = {
      welcomeText: determineWelcomeText(cycleDayNumber)
    }

    bleedingDaysSortedByDate.addListener(setStateWithCurrentWelcomeText.bind(this))
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(setStateWithCurrentWelcomeText)
  }

  render() {
    const navigate = this.props.navigation.navigate
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.welcomeText}</Text>
        <Button
          onPress={() => navigate('temperatureList')}
          title="Edit symptoms for today">
        </Button>
        <Button
          onPress={() => navigate('calendar')}
          title="Go to calendar">
        </Button>
        <Button
          onPress={() => deleteAll()}
          title="delete everything">
        </Button>
      </View>
    )
  }
}

function determineWelcomeText(cycleDayNumber) {
  const welcomeTextWithCycleDay = `Welcome! Today is day ${cycleDayNumber} of your current cycle`
  const welcomeText = `Welcome! We don't have enough information to know what your current cycle day is`
  return cycleDayNumber ? welcomeTextWithCycleDay : welcomeText
}

function setStateWithCurrentWelcomeText() {
  this.setState({ welcomeText: determineWelcomeText(getCycleDayNumber(this.todayDateString)) })
}