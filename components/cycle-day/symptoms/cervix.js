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
  cervixOpening as openingLabels,
  cervixFirmness as firmnessLabels,
  cervixPosition as positionLabels
} from '../labels/labels'

export default class Cervix extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    this.state = {
      exclude: this.cycleDay.cervix ? this.cycleDay.cervix.exclude : false
    }

    this.state.currentOpeningValue = this.cycleDay.cervix && this.cycleDay.cervix.opening
    if (typeof this.state.currentOpeningValue !== 'number') {
      this.state.currentOpeningValue = -1
    }
    this.state.currentFirmnessValue = this.cycleDay.cervix && this.cycleDay.cervix.firmness
    if (typeof this.state.currentFirmnessValue !== 'number') {
      this.state.currentFirmnessValue = -1
    }
    this.state.currentPositionValue = this.cycleDay.cervix && this.cycleDay.cervix.position
    if (typeof this.state.currentPositionValue !== 'number') {
      this.state.currentPositionValue = -1
    }
  }

  render() {
    const cervixOpeningRadioProps = [
      {label: openingLabels[0], value: 0},
      {label: openingLabels[1], value: 1},
      {label: openingLabels[2], value: 2}
    ]
    const cervixFirmnessRadioProps = [
      {label: firmnessLabels[0], value: 0 },
      {label: firmnessLabels[1], value: 1 }
    ]
    const cervixPositionRadioProps = [
      {label: positionLabels[0], value: 0 },
      {label: positionLabels[1], value: 1 },
      {label: positionLabels[2], value: 2 }
    ]
    return(
      <View style={ styles.symptomEditView }>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Opening</Text>
          <View style={styles.radioButtonRow}>
            <RadioForm
              radio_props={cervixOpeningRadioProps}
              initial={this.state.currentOpeningValue}
              formHorizontal={true}
              labelHorizontal={false}
              labelStyle={styles.radioButton}
              onPress={(itemValue) => {
                this.setState({currentOpeningValue: itemValue})
              }}
            />
          </View>
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Firmness</Text>
          <View style={styles.radioButtonRow}>
            <RadioForm
              radio_props={cervixFirmnessRadioProps}
              initial={this.state.currentFirmnessValue}
              formHorizontal={true}
              labelHorizontal={false}
              labelStyle={styles.radioButton}
              onPress={(itemValue) => {
                this.setState({currentFirmnessValue: itemValue})
              }}
            />
          </View>
        </View>
        <View style={styles.symptomViewRowInline}>
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
                  opening: this.state.currentOpeningValue,
                  firmness: this.state.currentFirmnessValue,
                  position: this.state.currentPositionValue,
                  exclude: this.state.exclude
                })
              },
              saveDisabled: this.state.currentOpeningValue === -1 || this.state.currentFirmnessValue === -1
            }
          )}
        </View>
      </View>
    )
  }
}
