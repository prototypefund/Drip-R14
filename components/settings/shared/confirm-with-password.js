import nodejs from 'nodejs-mobile-react-native'
import React, { Component } from 'react'
import { Alert, View } from 'react-native'

import { openDb, requestHash } from '../../../db'
import { shared } from '../../../i18n/en/labels'
import settings from '../../../i18n/en/settings'
import SettingsButton from '../shared/settings-button'
import PasswordField from './password-field'

export default class ConfirmWithPassword extends Component {
  constructor() {
    super()
    this.state = {
      password: null
    }
    nodejs.channel.addListener('password-check', this.checkPassword, this)
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('password-check', this.checkPassword)
  }

  resetPasswordInput = () => {
    this.setState({ password: null })
  }

  onIncorrectPassword = () => {
    Alert.alert(shared.incorrectPassword, shared.incorrectPasswordMessage, [
      {
        text: shared.cancel,
        onPress: this.props.onCancel
      },
      {
        text: shared.tryAgain,
        onPress: this.resetPasswordInput
      }
    ])
  }

  checkPassword = async hash => {
    try {
      await openDb(hash)
      this.props.onSuccess()
    } catch (err) {
      this.onIncorrectPassword()
    }
  }

  handlePasswordInput = password => {
    this.setState({ password })
  }

  initPasswordCheck = () => {
    requestHash('password-check', this.state.password)
  }

  render() {
    const { password } = this.state
    const labels = settings.passwordSettings

    return (
      <View>
        <PasswordField
          placeholder={labels.enterCurrent}
          value={password}
          onChangeText={this.handlePasswordInput}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <SettingsButton onPress={this.props.onCancel} secondary>
            {shared.cancel}
          </SettingsButton>
          <SettingsButton
            onPress={this.initPasswordCheck}
            disabled={!password}
            style={{
              flex: 1
            }}
          >
            {shared.confirmToProceed}
          </SettingsButton>
        </View>
      </View>
    )
  }
}
