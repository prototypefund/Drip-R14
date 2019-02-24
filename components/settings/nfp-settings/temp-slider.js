import Slider from '@ptomasroos/react-native-multi-slider'
import React, { Component } from 'react'
import { View } from 'react-native'

import config from '../../../config'
import labels from '../../../i18n/en/settings'
import { saveTempScale, scaleObservable } from '../../../local-storage'
import { secondaryColor } from '../../../styles/index'
import AppText from '../../app-text'
import alertError from '../shared/alert-error'

export default class TempSlider extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, scaleObservable.value)
  }

  onValuesChange = values => {
    this.setState({
      min: values[0],
      max: values[1]
    })
  }

  onValuesChangeFinish = values => {
    this.setState({
      min: values[0],
      max: values[1]
    })
    try {
      saveTempScale(this.state)
    } catch (err) {
      alertError(labels.tempScale.saveError)
    }
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <AppText>{`${labels.tempScale.min} ${this.state.min.toFixed(
          1
        )}`}</AppText>
        <AppText>{`${labels.tempScale.max} ${this.state.max.toFixed(
          1
        )}`}</AppText>
        <Slider
          values={[this.state.min, this.state.max]}
          min={config.temperatureScale.min}
          max={config.temperatureScale.max}
          step={0.5}
          onValuesChange={this.onValuesChange}
          onValuesChangeFinish={this.onValuesChangeFinish}
          selectedStyle={{
            backgroundColor: 'darkgrey'
          }}
          unselectedStyle={{
            backgroundColor: 'silver'
          }}
          trackStyle={{
            height: 10
          }}
          markerStyle={{
            backgroundColor: secondaryColor,
            height: 20,
            width: 20,
            borderRadius: 100,
            marginTop: 10
          }}
        />
      </View>
    )
  }
}
