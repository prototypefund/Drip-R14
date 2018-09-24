import React, { Component } from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { LocalDate } from 'js-joda'
import Header from '../header'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import styles, { iconStyles } from '../../styles'
import * as labels from './labels/labels'
import { AppText } from '../app-text'
import {createIconSetFromIcoMoon as createCustomIconSet} from 'react-native-vector-icons'
import icoMoonConfig from '../../selection.json'

const bleedingLabels = labels.bleeding
const feelingLabels = labels.mucus.feeling.categories
const textureLabels = labels.mucus.texture.categories
const openingLabels = labels.cervix.opening.categories
const firmnessLabels = labels.cervix.firmness.categories
const positionLabels = labels.cervix.position.categories
const intensityLabels = labels.intensity
const sexLabels = labels.sex
const painLabels = labels.pain.categories
const CustomIcon = createCustomIconSet(icoMoonConfig)

export default class CycleDayOverView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycleDay: props.cycleDay
    }
  }

  goToCycleDay = (target) => {
    const localDate = LocalDate.parse(this.state.cycleDay.date)
    const targetDate = target === 'before' ?
      localDate.minusDays(1).toString() :
      localDate.plusDays(1).toString()
    this.setState({ cycleDay: getOrCreateCycleDay(targetDate) })
  }

  navigate(symptom) {
    this.props.navigate(symptom, {
      cycleDay: this.state.cycleDay,
    })
  }

  render() {
    const cycleDay = this.state.cycleDay
    const getCycleDayNumber = cycleModule().getCycleDayNumber
    const cycleDayNumber = getCycleDayNumber(cycleDay.date)
    const dateInFuture = LocalDate
      .now()
      .isBefore(LocalDate.parse(this.state.cycleDay.date))
    return (
      <View style={{ flex: 1 }}>
        <Header
          isCycleDayOverView={true}
          cycleDayNumber={cycleDayNumber}
          date={cycleDay.date}
          goToCycleDay={this.goToCycleDay}
        />
        <ScrollView>
          <View style={styles.symptomBoxesView}>
            <SymptomBox
              title='Bleeding'
              onPress={() => this.navigate('BleedingEditView')}
              data={getLabel('bleeding', cycleDay.bleeding)}
              disabled={dateInFuture}
            />
            <SymptomBox
              title='Temperature'
              onPress={() => this.navigate('TemperatureEditView')}
              data={getLabel('temperature', cycleDay.temperature)}
              disabled={dateInFuture}
            />
            <SymptomBox
              title='Mucus'
              onPress={() => this.navigate('MucusEditView')}
              data={getLabel('mucus', cycleDay.mucus)}
              disabled={dateInFuture}
            />
            <SymptomBox
              title='Cervix'
              onPress={() => this.navigate('CervixEditView')}
              data={getLabel('cervix', cycleDay.cervix)}
              disabled={dateInFuture}
            />
            <SymptomBox
              title='Desire'
              onPress={() => this.navigate('DesireEditView')}
              data={getLabel('desire', cycleDay.desire)}
              disabled={dateInFuture}
            />
            <SymptomBox
              title='Sex'
              onPress={() => this.navigate('SexEditView')}
              data={getLabel('sex', cycleDay.sex)}
              disabled={dateInFuture}
            />
            <SymptomBox
              title='Pain'
              onPress={() => this.navigate('PainEditView')}
              data={getLabel('pain', cycleDay.pain)}
              disabled={dateInFuture}
            />
            <SymptomBox
              title='Note'
              onPress={() => this.navigate('NoteEditView')}
              data={getLabel('note', cycleDay.note)}
            />
            {/*  this is just to make the last row adhere to the grid
        (and) because there are no pseudo properties in RN */}
            <FillerBoxes />
          </View >
        </ScrollView >
      </View >
    )
  }
}

function getLabel(symptomName, symptom) {
  const l = {
    bleeding: bleeding => {
      if (isNumber(bleeding.value)) {
        let bleedingLabel = `${bleedingLabels[bleeding.value]}`
        if (bleeding.exclude) bleedingLabel = "( " + bleedingLabel + " )"
        return bleedingLabel
      }
    },
    temperature: temperature => {
      if (isNumber(temperature.value)) {
        let temperatureLabel = `${temperature.value} °C - ${temperature.time}`
        if (temperature.exclude) {
          temperatureLabel = "( " + temperatureLabel + " )"
        }
        return temperatureLabel
      }
    },
    mucus: mucus => {
      const categories = ['feeling', 'texture', 'value']
      if (categories.every(c => isNumber(mucus[c]))) {
        let mucusLabel = [feelingLabels[mucus.feeling], textureLabels[mucus.texture]].join(', ')
        mucusLabel += `\n${labels.mucusNFP[mucus.value]}`
        if (mucus.exclude) mucusLabel = `(${mucusLabel})`
        return mucusLabel
      }
    },
    cervix: cervix => {
      let cervixLabel = []
      if (isNumber(cervix.opening) && isNumber(cervix.firmness)) {
        cervixLabel.push(
          openingLabels[cervix.opening],
          firmnessLabels[cervix.firmness]
        )
        if (isNumber(cervix.position)) {
          cervixLabel.push(positionLabels[cervix.position])
        }
        cervixLabel = cervixLabel.join(', ')
        if (cervix.exclude) cervixLabel = `(${cervixLabel})`
        return cervixLabel
      }
    },
    note: note => {
      return note.value
    },
    desire: desire => {
      if (isNumber(desire.value)) {
        const desireLabel = `${intensityLabels[desire.value]}`
        return desireLabel
      }
    },
    sex: sex => {
      let sexLabel = []
      if (sex && Object.values(sex).some(val => val)){
        Object.keys(sex).forEach(key => {
          if(sex[key] && key !== 'other' && key !== 'note') {
            sexLabel.push(sexLabels[key])
          }
          if(key === 'other' && sex.other) {
            let label = sexLabels[key]
            if(sex.note) {
              label = `${label} (${sex.note})`
            }
            sexLabel.push(label)
          }
        })
        sexLabel = sexLabel.join(', ')
      }
      return sexLabel
    },
    pain: pain => {
      let painLabel = []
      if (pain && Object.values(pain).some(val => val)){
        Object.keys(pain).forEach(key => {
          if(pain[key] && key !== 'other' && key !== 'note') {
            painLabel.push(painLabels[key])
          }
          if(key === 'other' && pain.other) {
            let label = painLabels[key]
            if(pain.note) {
              label = `${label} (${pain.note})`
            }
            painLabel.push(label)
          }
        })
        painLabel = painLabel.join(', ')
      }
      return painLabel
    }
  }

  if (!symptom) return
  const label = l[symptomName](symptom)
  if (label.length < 45) return label
  return label.slice(0, 42) + '...'
}

class SymptomBox extends Component {
  render() {
    const d = this.props.data
    const boxActive = d ? styles.symptomBoxActive : {}
    const iconActive = d ? iconStyles.symptomBoxActive : {}
    const iconStyle = Object.assign(
      {}, iconStyles.symptomBox, iconActive, disabledStyle
    )
    const textActive = d ? styles.symptomTextActive : {}
    const disabledStyle = this.props.disabled ? styles.symptomInFuture : {}

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <View style={[styles.symptomBox, boxActive, disabledStyle]}>
          <CustomIcon
            name={this.props.title}
            {...iconStyle}
          />
          <AppText style={[textActive, disabledStyle]}>
            {this.props.title}
          </AppText>
        </View>
        <View style={[styles.symptomDataBox, disabledStyle]}>
          <AppText style={styles.symptomDataText}>{this.props.data}</AppText>
        </View>
      </TouchableOpacity>
    )
  }
}

class FillerBoxes extends Component {
  render() {
    const n = Dimensions.get('window').width / styles.symptomBox.width
    const fillerBoxes = []
    for (let i = 0; i < Math.ceil(n); i++) {
      fillerBoxes.push(
        <View
          width={styles.symptomBox.width}
          height={0}
          key={i.toString()}
        />
      )
    }
    return fillerBoxes
  }
}

function isNumber(val) {
  return typeof val === 'number'
}