import React, { Component } from 'react'
import {
  View,
  Text,
  Switch
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import {
  cervixPosition as positionLabels,
  cervixConsistency as consistencyLabels
} from '../labels/labels'
import computeSensiplanValue from '../../../lib/sensiplan-cervix'

export default class Cervix extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    this.state = {
      exclude: this.cycleDay.cervix ? this.cycleDay.cervix.exclude : false
    }

    this.state.currentPositionValue = this.cycleDay.cervix && this.cycleDay.cervix.position
    if (typeof currentPositionValue !== 'number') {
      this.state.currentPositionValue = -1
    }

    this.state.currentConsistencyValue = this.cycleDay.cervix && this.cycleDay.cervix.consistency
    if (typeof currentConsistencyValue !== 'number') {
      this.state.currentConsistencyValue = -1
    }
  }

  render() {
    const cervixPositionRadioProps = [
      {label: positionLabels[0], value: 0 },
      {label: positionLabels[1], value: 1 },
      {label: positionLabels[2], value: 2 }
    ]
    const cervixConsistencyRadioProps = [
      {label: consistencyLabels[0], value: 0 },
      {label: consistencyLabels[1], value: 1 }
    ]
    return(
      <View style={ styles.symptomEditView }>
        <Text style={styles.symptomDayView}>Cervix</Text>
        <Text style={styles.symptomDayView}>Position</Text>
        <View style={styles.radioButtonRow}>
          <RadioForm
            radio_props={cervixPositionRadioProps}
            initial={this.state.currentPositionValue}
            formHorizontal={true}
            labelHorizontal={false}
            labelStyle={styles.radioButton}
            onPress={(itemValue) => {
              this.setState({currentPositionValue: itemValue})
            }}
          />
        </View>
        <Text style={styles.symptomDayView}>Consistency</Text>
        <View style={styles.radioButtonRow}>
          <RadioForm
            radio_props={cervixConsistencyRadioProps}
            initial={this.state.currentConsistencyValue}
            formHorizontal={true}
            labelHorizontal={false}
            labelStyle={styles.radioButton}
            onPress={(itemValue) => {
              this.setState({currentConsistencyValue: itemValue})
            }}
          />
        </View>

        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Exclude</Text>
          <Switch
            onValueChange={(val) => {
              this.setState({ exclude: val })
            }}
            value={this.state.exclude}
          />
        </View>

        <View style={styles.actionButtonRow}>
          {this.makeActionButtons(
            {
              symptom: 'cervix',
              cycleDay: this.cycleDay,
              saveAction: () => {
                saveSymptom('cervix', this.cycleDay, {
                  position: this.state.currentPositionValue,
                  consistency: this.state.currentConsistencyValue,
                  computedNfp: computeSensiplanValue(this.state.currentPositionValue, this.state.currentConsistencyValue),
                  exclude: this.state.exclude
                })
              },
              saveDisabled: this.state.currentPositionValue === -1 || this.state.currentConsistencyValue === -1
            }
          )}
        </View>
      </View>
    )
  }
}
