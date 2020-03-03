import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getDate, setDate } from '../../slices/date'
import { navigate } from '../../slices/navigation'

import { LocalDate } from 'js-joda'
import Header from '../header'
import FillerBoxes from './FillerBoxes'
import SymptomBox from './SymptomBox'

import cycleModule from '../../lib/cycle'
import formatDate from '../helpers/format-date'
import { getCycleDay } from '../../db'
import styles from '../../styles'

class CycleDayOverView extends Component {

  static propTypes = {
    navigate: PropTypes.func,
    setDate: PropTypes.func,
    // The following are not being used,
    // we could see if it's possible to not pass them from the <App />
    cycleDay: PropTypes.object,
    date: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      cycleDay: getCycleDay(props.date)
    }
  }

  updateCycleDay = (date) => {
    this.props.setDate(date)
    this.setState({
      cycleDay: getCycleDay(date)
    })
  }

  goToPrevDay = () => {
    const { date } = this.props
    const prevDate = LocalDate.parse(date).minusDays(1).toString()
    this.updateCycleDay(prevDate)
  }

  goToNextDay = () => {
    const { date } = this.props
    const nextDate = LocalDate.parse(date).plusDays(1).toString()
    this.updateCycleDay(nextDate)
  }

  render() {
    const { cycleDay } = this.state
    const { date } = this.props

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

    const { getCycleDayNumber } = cycleModule()
    const cycleDayNumber = getCycleDayNumber(date)
    const headerSubtitle = cycleDayNumber && `Cycle day ${cycleDayNumber}`

    return (
      <View style={{ flex: 1 }}>
        <Header
          handleBack={this.goToPrevDay}
          handleNext={this.goToNextDay}
          title={formatDate(date)}
          subtitle={headerSubtitle}
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
                    onPress={() => this.props.navigate(symptomEditView)}
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
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CycleDayOverView)
