import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import AppPage from '../common/app-page'
import SymptomBox from './symptom-box'
import SymptomPageTitle from './symptom-page-title'

import { connect } from 'react-redux'
import { getDate, setDate } from '../../slices/date'
import { navigate } from '../../slices/navigation'

import cycleModule from '../../lib/cycle'
import { dateToTitle } from '../helpers/format-date'
import { getCycleDay } from '../../db'
import { getData } from '../helpers/cycle-day'

import { general as labels } from '../../i18n/en/cycle-day'
import { Spacing } from '../../styles'
import { SYMPTOMS } from '../../config'

class CycleDayOverView extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    setDate: PropTypes.func,
    cycleDay: PropTypes.object,
    date: PropTypes.string,
    isTemperatureEditView: PropTypes.bool,
  }

  render() {
    const { date, isTemperatureEditView } = this.props
    const cycleDay = getCycleDay(date)

    const { getCycleDayNumber } = cycleModule()
    const cycleDayNumber = getCycleDayNumber(date)
    const subtitle =
      cycleDayNumber && `${labels.cycleDayNumber}${cycleDayNumber}`

    return (
      <AppPage>
        <SymptomPageTitle subtitle={subtitle} title={dateToTitle(date)} />
        <View style={styles.container}>
          {SYMPTOMS.map((symptom) => {
            const symptomData =
              cycleDay && cycleDay[symptom] ? cycleDay[symptom] : null

            const isSymptomEdited =
              isTemperatureEditView && symptom === 'temperature'

            return (
              <SymptomBox
                key={symptom}
                symptom={symptom}
                symptomData={symptomData}
                symptomDataToDisplay={getData(symptom, symptomData)}
                isSymptomEdited={isSymptomEdited}
              />
            )
          })}
        </View>
      </AppPage>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: Spacing.base,
  },
})

const mapStateToProps = (state) => {
  return {
    date: getDate(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (date) => dispatch(setDate(date)),
    navigate: (page) => dispatch(navigate(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CycleDayOverView)
