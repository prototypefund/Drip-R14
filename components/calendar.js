import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CalendarList } from 'react-native-calendars'
import { connect } from 'react-redux'

import { setDate } from '../slices/date'
import { navigate } from '../slices/navigation'

import { LocalDate } from 'js-joda'
import { getBleedingDaysSortedByDate } from '../db'
import cycleModule from '../lib/cycle'
import { shadesOfRed, calendarTheme } from '../styles/index'
import styles from '../styles/index'
import nothingChanged from '../db/db-unchanged'

class CalendarView extends Component {
  static propTypes = {
    setDate: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.bleedingDays = getBleedingDaysSortedByDate()
    const predictedMenses = cycleModule().getPredictedMenses()
    this.state = {
      bleedingDaysInCalFormat: toCalFormat(this.bleedingDays),
      predictedBleedingDaysInCalFormat: predictionToCalFormat(predictedMenses),
      todayInCalFormat: todayToCalFormat()
    }

    this.bleedingDays.addListener(this.setStateWithCalFormattedDays)
  }

  setStateWithCalFormattedDays = (_, changes) => {
    if (nothingChanged(changes)) return
    const predictedMenses = cycleModule().getPredictedMenses()
    this.setState({
      bleedingDaysInCalFormat: toCalFormat(this.bleedingDays),
      predictedBleedingDaysInCalFormat: predictionToCalFormat(predictedMenses),
      todayInCalFormat: todayToCalFormat()
    })
  }

  componentWillUnmount() {
    this.bleedingDays.removeListener(this.setStateWithCalFormattedDays)
  }

  passDateToDayView = (result) => {
    this.props.setDate(result.dateString)
    this.props.navigate('CycleDay')
  }

  render() {
    return (
      <CalendarList
        onDayPress={this.passDateToDayView.bind(this)}
        markedDates={
          Object.assign(
            {},
            this.state.todayInCalFormat,
            this.state.bleedingDaysInCalFormat,
            this.state.predictedBleedingDaysInCalFormat
          )
        }
        markingType={'custom'}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        theme={calendarTheme}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    setDate: (date) => dispatch(setDate(date)),
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(CalendarView)


function toCalFormat(bleedingDaysSortedByDate) {
  const todayDateString = LocalDate.now().toString()
  return bleedingDaysSortedByDate.reduce((acc, day) => {
    acc[day.date] = {
      customStyles: {
        container: {
          backgroundColor: shadesOfRed[day.bleeding.value],
        }
      }
    }
    if (day.date === todayDateString) {
      acc[day.date].customStyles.text = styles.calendarToday
    }
    return acc
  }, {})
}

function predictionToCalFormat(predictedDays) {
  if (!predictedDays.length) return {}
  const todayDateString = LocalDate.now().toString()
  const middleIndex = (predictedDays[0].length - 1) / 2
  return predictedDays.reduce((acc, setOfDays) => {
    setOfDays.reduce((accSet, day, i) => {
      accSet[day] = {
        customStyles: {
          container: {
            borderColor: (i === middleIndex) ? shadesOfRed[3] : shadesOfRed[2],
            borderWidth: 3,
          },
          text: {
            marginTop: 1,
          }
        }
      }
      if (day === todayDateString) {
        accSet[day].customStyles.text = Object.assign(
          {},
          styles.calendarToday,
          {marginTop: -2}
        )
      }
      return accSet
    }, acc)
    return acc
  }, {})
}

function todayToCalFormat() {
  const todayDateString = LocalDate.now().toString()
  const todayFormated = {}
  todayFormated[todayDateString] = {
    customStyles: {
      text: styles.calendarToday
    }
  }
  return todayFormated
}