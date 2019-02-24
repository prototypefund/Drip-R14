import { ChronoUnit, LocalDate } from 'js-joda'
import React, { Component } from 'react'
import { Dimensions, ScrollView, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import DripHomeIcon from '../assets/drip-home-icons'
import {
  home as labels,
  bleedingPrediction as predictLabels,
  shared
} from '../i18n/en/labels'
import links from '../i18n/en/links'
import cycleModule from '../lib/cycle'
import { getFertilityStatusForDay } from '../lib/sympto-adapter'
import { cycleDayColor, periodColor, secondaryColor } from '../styles'
import styles from '../styles'
import AppText from './app-text'
import Button from './button'

const ShowMoreToggler = ({ isShowingMore, onToggle }) => {
  const { height, width } = Dimensions.get('window')
  const leftPosition = isShowingMore ? 10 : width - 40
  const style = isShowingMore ? styles.showLess : styles.showMore
  const topPosition = height / 2 - styles.header.height - 30

  return (
    <TouchableHighlight
      onPress={onToggle}
      style={[style, { top: topPosition, left: leftPosition }]}
    >
      <View style={{ alignItems: 'center' }}>
        <AppText>{isShowingMore ? shared.less : shared.more}</AppText>
        <Icon name="chevron-thin-down" />
      </View>
    </TouchableHighlight>
  )
}

const IconText = ({ children, wrapperStyles }) => {
  return (
    <View style={[styles.homeIconTextWrapper, wrapperStyles]}>
      <AppText style={styles.iconText}>{children}</AppText>
    </View>
  )
}

const HomeElement = ({ children, onPress, buttonColor, buttonLabel }) => {
  return (
    <View onPress={onPress} style={styles.homeIconElement}>
      {children}
      <Button
        style={styles.homeButton}
        onPress={onPress}
        backgroundColor={buttonColor}
      >
        {buttonLabel}
      </Button>
    </View>
  )
}

export default class Home extends Component {
  constructor(props) {
    super(props)
    const { getCycleDayNumber, getPredictedMenses } = cycleModule()
    this.getCycleDayNumber = getCycleDayNumber
    this.getBleedingPrediction = getPredictedMenses
    this.todayDateString = LocalDate.now().toString()
    const prediction = this.getBleedingPrediction()
    const fertilityStatus = getFertilityStatusForDay(this.todayDateString)

    this.state = {
      isShowingMore: false,
      cycleDayNumber: this.getCycleDayNumber(this.todayDateString),
      predictionText: determinePredictionText(prediction),
      bleedingPredictionRange: getBleedingPredictionRange(prediction),
      ...fertilityStatus
    }
  }

  passTodayTo(componentName) {
    const { navigate } = this.props
    navigate(componentName, { date: LocalDate.now().toString() })
  }

  toggleShowingMore = () => {
    this.setState({ isShowingMore: !this.state.isShowingMore })
  }

  render() {
    const { isShowingMore, cycleDayNumber, phase, status } = this.state
    const { navigate } = this.props
    const cycleDayMoreText = cycleDayNumber
      ? labels.cycleDayKnown(cycleDayNumber)
      : labels.cycleDayNotEnoughInfo

    const { statusText } = this.state

    return (
      <View flex={1}>
        <ScrollView>
          <View style={styles.homeView}>
            <HomeElement
              onPress={() => this.passTodayTo('CycleDay')}
              buttonColor={cycleDayColor}
              buttonLabel={labels.editToday}
            >
              <View>
                <DripHomeIcon name="circle" size={80} color={cycleDayColor} />
              </View>
              <IconText wrapperStyles={styles.wrapperCycle}>
                {cycleDayNumber || labels.unknown}
              </IconText>

              {isShowingMore && (
                <AppText style={styles.paragraph}>{cycleDayMoreText}</AppText>
              )}
            </HomeElement>

            <HomeElement
              onPress={() => this.passTodayTo('BleedingEditView')}
              buttonColor={periodColor}
              buttonLabel={labels.trackPeriod}
            >
              <View>
                <DripHomeIcon name="drop" size={105} color={periodColor} />
              </View>

              <IconText wrapperStyles={styles.wrapperDrop}>
                {this.state.bleedingPredictionRange}
              </IconText>

              {isShowingMore && (
                <AppText style={styles.paragraph}>
                  {this.state.predictionText}
                </AppText>
              )}
            </HomeElement>

            <HomeElement
              onPress={() => navigate('Chart')}
              buttonColor={secondaryColor}
              buttonLabel={labels.checkFertility}
            >
              <View style={styles.homeCircle} />

              <IconText wrapperStyles={styles.wrapperCircle}>
                {phase ? phase.toString() : labels.unknown}
              </IconText>

              {phase && (
                <AppText>{`${labels.phase(phase)} (${status})`}</AppText>
              )}
              {isShowingMore && (
                <View>
                  <AppText styles={styles.paragraph}>
                    {`${statusText} ${links.moreAboutNfp.url}`}
                  </AppText>
                </View>
              )}
            </HomeElement>
          </View>
        </ScrollView>
        <ShowMoreToggler
          isShowingMore={isShowingMore}
          onToggle={this.toggleShowingMore}
        />
      </View>
    )
  }
}

function determinePredictionText(bleedingPrediction) {
  if (!bleedingPrediction.length) return predictLabels.noPrediction
  const todayDate = LocalDate.now()
  const bleedingStart = LocalDate.parse(bleedingPrediction[0][0])
  const bleedingEnd = LocalDate.parse(
    bleedingPrediction[0][bleedingPrediction[0].length - 1]
  )
  if (todayDate.isBefore(bleedingStart)) {
    return predictLabels.predictionInFuture(
      todayDate.until(bleedingStart, ChronoUnit.DAYS),
      todayDate.until(bleedingEnd, ChronoUnit.DAYS)
    )
  }
  if (todayDate.isAfter(bleedingEnd)) {
    return predictLabels.predictionInPast(
      bleedingStart.toString(),
      bleedingEnd.toString()
    )
  }
  const daysToEnd = todayDate.until(bleedingEnd, ChronoUnit.DAYS)
  if (daysToEnd === 0) {
    return predictLabels.predictionStartedNoDaysLeft
  } else if (daysToEnd === 1) {
    return predictLabels.predictionStarted1DayLeft
  } else {
    return predictLabels.predictionStartedXDaysLeft(daysToEnd)
  }
}

function getBleedingPredictionRange(prediction) {
  if (!prediction.length) return labels.unknown
  const todayDate = LocalDate.now()
  const bleedingStart = LocalDate.parse(prediction[0][0])
  const bleedingEnd = LocalDate.parse(prediction[0][prediction[0].length - 1])
  if (todayDate.isBefore(bleedingStart)) {
    return `${todayDate.until(
      bleedingStart,
      ChronoUnit.DAYS
    )}-${todayDate.until(bleedingEnd, ChronoUnit.DAYS)}`
  }
  if (todayDate.isAfter(bleedingEnd)) {
    return labels.unknown
  }
  return '0'
}
