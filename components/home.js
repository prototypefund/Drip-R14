import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View } from 'react-native'

import { LocalDate } from 'js-joda'
import AppText from './app-text'
import Button from './button'

import { connect } from 'react-redux'
import { navigate } from '../slices/navigation'
import { getDate, setDate } from '../slices/date'
import cycleModule from '../lib/cycle'
import { getFertilityStatusForDay } from '../lib/sympto-adapter'
import { determinePredictionText, dateEnding} from './helpers/home'

import styles from '../styles/redesign'
import { home_redesign as labels } from '../i18n/en/labels'

class Home extends Component {

  static propTypes = {
    navigate: PropTypes.func,
    setDate: PropTypes.func,
  }

  constructor(props) {
    super(props)

    const today = LocalDate.now()
    this.todayDateString = today.toString()
    const { getCycleDayNumber, getPredictedMenses } = cycleModule()
    const cycleDayNumber = getCycleDayNumber(this.todayDateString)
    const {status, phase, statusText} =
      getFertilityStatusForDay(this.todayDateString)
    const prediction = getPredictedMenses()

    this.cycleDayText = !cycleDayNumber ? '?'
      : `${cycleDayNumber}${dateEnding[this.cycleDayNumber] || dateEnding['default']}`
    this.phaseText = !phase ? '?'
      : `${phase}${dateEnding[phase] || dateEnding['default']}`
    this.predictionText = determinePredictionText(prediction)
    this.status = status
    this.statusDescription = statusText
    this.titleText = `${today.dayOfMonth()} ${today.month()}`
  }

  navigateToCycleDayView = () => {
    this.props.setDate(this.todayDateString)
    this.props.navigate('CycleDay')
  }

  render() {
    const {
      cycleDayText,
      phaseText,
      predictionText,
      status,
      statusDescription,
      titleText
    } = this

    return (
      <View style={styles.homePageContainer}>
        <ScrollView
          contentContainerStyle={styles.homeContentContainer}
          vertical={true}
        >
          <AppText style={styles.titleText}>{titleText}</AppText>
          <View style={styles.lineContainer}>
            <AppText style={styles.whiteText}>{cycleDayText}</AppText>
            <AppText>{labels.cycleDay}</AppText>
          </View>
          <View style={styles.lineContainer}>
            <AppText style={styles.whiteText}>{phaseText}</AppText>
            <AppText>{labels.cyclePhase}</AppText>
            <AppText style={styles.whiteText}>{status}</AppText>
            <AppText style={styles.orangeText}>*</AppText>
          </View>
          <View style={styles.lineContainer}>
            <AppText>{predictionText}</AppText>
          </View>
          <Button
            label={labels.addData}
            onPress={this.navigateToCycleDayView}
          />
          <View style={{flexDirection: 'row'}}>
            <AppText style={styles.orangeText}>*</AppText>
            <AppText style={styles.hintText}>{statusDescription}</AppText>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
