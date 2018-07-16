import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from '../../styles'
import {
  bleeding as bleedingLabels,
  mucusFeeling as feelingLabels,
  mucusTexture as textureLabels,
  mucusNFP as computeSensiplanMucusLabels,
  cervixPosition as positionLabels,
  cervixConsistency as consistencyLabels
} from './labels/labels'
import cycleDayModule from '../../lib/get-cycle-day-number'
import { bleedingDaysSortedByDate } from '../../db'

const getCycleDayNumber = cycleDayModule()

export default class DayView extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.showView = props.showView
    this.state = {
      cycleDayNumber: getCycleDayNumber(this.cycleDay.date),
    }

    this.setStateWithCurrentCycleDayNumber = (function (DayViewComponent) {
      return function () {
        DayViewComponent.setState({
          cycleDayNumber: getCycleDayNumber(DayViewComponent.cycleDay.date)
        })
      }
    })(this)

    bleedingDaysSortedByDate.addListener(this.setStateWithCurrentCycleDayNumber)
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(this.setStateWithCurrentCycleDayNumber)
  }

  render() {
    const bleedingValue = this.cycleDay.bleeding && this.cycleDay.bleeding.value
    let bleedingLabel
    if (typeof bleedingValue === 'number') {
      bleedingLabel = `${bleedingLabels[bleedingValue]}`
      if (this.cycleDay.bleeding.exclude) bleedingLabel = "( " + bleedingLabel + " )"
    } else {
      bleedingLabel = 'edit'
    }

    const temperatureValue = this.cycleDay.temperature && this.cycleDay.temperature.value
    let temperatureLabel
    if (typeof temperatureValue === 'number') {
      temperatureLabel = `${temperatureValue} °C`
      if (this.cycleDay.temperature.exclude) temperatureLabel = "( " + temperatureLabel + " )"
    } else {
      temperatureLabel = 'edit'
    }

    const mucusFeelingValue = this.cycleDay.mucus && this.cycleDay.mucus.feeling
    const mucusTextureValue = this.cycleDay.mucus && this.cycleDay.mucus.texture
    const mucusComputedValue = this.cycleDay.mucus && this.cycleDay.mucus.computedNfp
    let mucusLabel
    if (typeof mucusFeelingValue === 'number' && typeof mucusTextureValue === 'number') {
      mucusLabel = `${feelingLabels[mucusFeelingValue]} + ${textureLabels[mucusTextureValue]} ( ${computeSensiplanMucusLabels[mucusComputedValue]} )`
      if (this.cycleDay.mucus.exclude) mucusLabel = "( " + mucusLabel + " )"
    } else {
      mucusLabel = 'edit'
    }

    const cervixPositionValue = this.cycleDay.cervix && this.cycleDay.cervix.position
    const cervixConsistencyValue = this.cycleDay.cervix && this.cycleDay.cervix.consistency
    const cervixComputedValue = this.cycleDay.cervix && this.cycleDay.cervix.computedNfp
    let cervixLabel
    if (typeof cervixPositionValue === 'number' && typeof cervixConsistencyValue === 'number') {
      cervixLabel = `${positionLabels[cervixPositionValue]} + ${consistencyLabels[cervixConsistencyValue]} ( ${cervixComputedValue} )`
      if (this.cycleDay.cervix.exclude) cervixLabel = "( " + cervixLabel + " )"
    } else {
      cervixLabel = 'edit'
    }

    return (
      <View style={styles.symptomEditView}>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Bleeding</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('bleedingEditView')}
              title={bleedingLabel}>
            </Button>
          </View>
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Temperature</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('temperatureEditView')}
              title={temperatureLabel}>
            </Button>
          </View>
        </View>
        <View style={ styles.symptomViewRowInline }>
          <Text style={styles.symptomDayView}>Mucus</Text>
          <View style={ styles.symptomEditButton }>
            <Button
              onPress={() => this.showView('mucusEditView')}
              title={mucusLabel}>
            </Button>
          </View>
        </View>
        <View style={ styles.symptomViewRowInline }>
          <Text style={styles.symptomDayView}>Cervix</Text>
          <View style={ styles.symptomEditButton }>
            <Button
              onPress={() => this.showView('cervixEditView')}
              title={cervixLabel}>
            </Button>
          </View>
        </View>
      </View >
    )
  }
}
