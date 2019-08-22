import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import { connect } from 'react-redux'
import { getDate, setDate } from '../../slices/date'

import { LocalDate } from 'js-joda'
import Header from '../header'
import FillerBoxes from './FillerBoxes'
import SymptomBox from './SymptomBox'

import { getCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import styles from '../../styles'

class CycleDayOverView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycleDay: getCycleDay(props.date)
    }
  }

  goToCycleDay = (target) => {
    const localDate = LocalDate.parse(this.props.date)
    const targetDate = target === 'before' ?
      localDate.minusDays(1).toString() :
      localDate.plusDays(1).toString()
    this.props.setDate(targetDate)
    this.setState({
      cycleDay: getCycleDay(targetDate)
    })
  }

  navigate(symptom) {
    const { cycleDay } = this.state
    this.props.navigate(symptom, cycleDay)
  }

  render() {
    const { getCycleDayNumber } = cycleModule()
    const { cycleDay } = this.state
    const { date } = this.props

    const cycleDayNumber = getCycleDayNumber(date)
    const dateInFuture = LocalDate.now().isBefore(LocalDate.parse(date))

    const symptomBoxesList = [
      'bleeding',
      'temperature',
      'mucus',
      'cervix',
      'desire',
      'sex',
      'pain',
      'mood',
      'note',
    ]

    return (
      <View style={{ flex: 1 }}>
        <Header
          isCycleDayOverView={true}
          cycleDayNumber={cycleDayNumber}
          date={date}
          goToCycleDay={this.goToCycleDay}
        />
        <ScrollView>
          <View style={styles.symptomBoxesView}>
            {
              symptomBoxesList.map(symptom => {
                const symptomEditView =
                  `${symptom[0].toUpperCase() + symptom.substring(1)}EditView`
                const symptomData =
                  cycleDay && cycleDay[symptom] ? cycleDay[symptom] : null
                return(
                  <SymptomBox
                    key={symptom}
                    symptom={symptom}
                    symptomData={symptomData}
                    onPress={() => this.navigate(symptomEditView, symptomData)}
                    disabled={dateInFuture}
                  />)
              })
            }
            {
              // this is just to make the last row adhere to the grid
              // (and) because there are no pseudo properties in RN
            }
            <FillerBoxes />
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
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CycleDayOverView)
