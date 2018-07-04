import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  Switch
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import { saveMucus } from '../db'
import styles from '../styles/index'
import {
  mucusFeeling as feelingLabels,
  mucusTexture as textureLabels
} from '../labels/labels'

export default class Mucus extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.showView = props.showView

    this.currentFeelingValue = this.cycleDay.mucus && this.cycleDay.mucus.feeling
    if (typeof this.currentFeelingValue !== 'number') {
      this.currentFeelingValue = -1
    }

    this.currentTextureValue = this.cycleDay.mucus && this.cycleDay.mucus.texture
    if (typeof this.currentTextureValue !== 'number') {
      this.currentTextureValue = -1
    }
    this.state = {
      exclude: this.cycleDay.mucus ? this.cycleDay.mucus.exclude : false
    }
  }

  render() {
    const mucusFeelingRadioProps = [
      {label: feelingLabels[0], value: 0 },
      {label: feelingLabels[1], value: 1 },
      {label: feelingLabels[2], value: 2 },
      {label: feelingLabels[3], value: 3 }
    ]
    const mucusTextureRadioProps = [
      {label: textureLabels[0], value: 0 },
      {label: textureLabels[1], value: 1 },
      {label: textureLabels[2], value: 2 }
    ]
    return(
      <View style={ styles.symptomEditView }>
        <View style={ styles.symptomEditSplitSymptomsAndLastRowButtons }>
          <View style={ styles.symptomEditListedSymptomView }>

            <View style={{flex: 1}}>
              <Text style={styles.symptomDayView}>Mucus</Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.symptomDayView}>Feeling</Text>
            </View>

            <View style={{flex: 1}}>
              <RadioForm
                radio_props={mucusFeelingRadioProps}
                initial={this.currentFeelingValue}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.currentFeelingValue = itemValue
                }}
              />
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.symptomDayView}>Color/Texture</Text>
            </View>

            <View style={{flex: 1}}>
              <RadioForm
                radio_props={mucusTextureRadioProps}
                initial={this.currentTextureValue}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.currentTextureValue = itemValue
                }}
              />
            </View>

          </View>

          <View style={ styles.itemsInRowSeparatedView }>

            <View style={ styles.singleButtonView }>
              <Text style={ styles.symptomDayView }>Exclude</Text>
            </View>

            <View style={ styles.singleButtonView }>
              <Switch
                onValueChange={(val) => {
                  this.setState({exclude: val})
                }}
                value={this.state.exclude}
              />
            </View>

          </View>

        </View>

        <View style={ styles.itemsInRowSeparatedView }>

          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => this.showView('dayView')}
              title="Cancel">
            </Button>
          </View>

          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => {
                saveMucus(this.cycleDay)
                this.showView('dayView')
              }}
              title="Delete">
            </Button>
          </View>

          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => {
                saveMucus(this.cycleDay, {
                  feeling: this.currentFeelingValue,
                  texture: this.currentTextureValue,
                  exclude: this.state.exclude
                })
                this.showView('dayView')
              }}
              // FIXME: find out how disabled works when 2 values need to be checked
              // disabled={ this.currentFeelingValue === -1 && this.currentTextureValue === -1 }
              title="Save">
            </Button>
          </View>

        </View>

      </View>
    )
  }
}
