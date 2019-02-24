import React, { Component } from 'react'
import { ScrollView, TextInput, View } from 'react-native'

import { saveSymptom } from '../../../db'
import { noteExplainer } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import styles from '../../../styles'
import ActionButtonFooter from './action-button-footer'
import SymptomSection from './symptom-section'

export default class Note extends Component {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.note = cycleDay && cycleDay.note
    this.makeActionButtons = props.makeActionButtons

    this.state = {
      currentValue: (this.note && this.note.value) || ''
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <SymptomSection explainer={noteExplainer}>
            <TextInput
              autoFocus={!this.state.currentValue}
              multiline={true}
              placeholder={sharedLabels.enter}
              onChangeText={val => {
                this.setState({ currentValue: val })
              }}
              value={this.state.currentValue}
            />
          </SymptomSection>
        </ScrollView>
        <ActionButtonFooter
          symptom="note"
          date={this.props.date}
          currentSymptomValue={this.note}
          saveAction={() => {
            saveSymptom('note', this.props.date, {
              value: this.state.currentValue
            })
          }}
          saveDisabled={!this.state.currentValue}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
