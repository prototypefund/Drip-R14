import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Slider from '@ptomasroos/react-native-multi-slider'

import alertError from '../common/alert-error'
import SliderLabel from './slider-label'

import { Settings as UnitSettings } from '../units'

import { scaleObservable, saveTempScale } from '../../../local-storage'
import { Colors, Sizes } from '../../../styles'
import labels from '../../../i18n/en/settings'
import { TEMP_MIN_F, TEMP_MAX_F, TEMP_MIN_C, TEMP_MAX_C, TEMP_SLIDER_STEP } from '../../../config'

const TemperatureSlider = () => {
  const savedValue = scaleObservable.value
  const [minTemperature, setMinTemperature] = useState(savedValue.min)
  const [maxTemperature, setMaxTemperature] = useState(savedValue.max)

  const onTemperatureSliderChange = ([min, max]) => {
    setMinTemperature(min)
    setMaxTemperature(max)
    try {
      saveTempScale({ min, max })
    } catch (err) {
      alertError(labels.tempScale.saveError)
    }
  }

  return (
    <View style={styles.container}>
      <Slider
        customLabel={SliderLabel}
        enableLabel={true}
        markerStyle={styles.marker}
        markerOffsetY={Sizes.tiny}
        max={UnitSettings.shouldUseImperial ? TEMP_MAX_F : TEMP_MAX_C}
        min={UnitSettings.shouldUseImperial ? TEMP_MIN_F : TEMP_MIN_C}
        onValuesChange={onTemperatureSliderChange}
        selectedStyle={styles.sliderAccentBackground}
        step={TEMP_SLIDER_STEP}
        trackStyle={styles.slider}
        unselectedStyle={styles.sliderBackground}
        values={[minTemperature, maxTemperature]}
      />
    </View>
  )
}

export default TemperatureSlider

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Sizes.base,
  },
  marker: {
    backgroundColor: Colors.turquoiseDark,
    borderRadius: 50,
    elevation: 4,
    height: Sizes.subtitle,
    width: Sizes.subtitle,
  },
  slider: {
    borderRadius: 25,
    height: Sizes.small,
  },
  sliderAccentBackground: {
    backgroundColor: Colors.turquoiseDark,
  },
  sliderBackground: {
    backgroundColor: Colors.turquoise,
  },
})
