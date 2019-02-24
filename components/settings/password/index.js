import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import labels from '../../../i18n/en/settings'
import { hasEncryptionObservable } from '../../../local-storage'
import AppText from '../../app-text'
import FramedSegment from '../../framed-segment'
import CreatePassword from './create'
import DeletePassword from './delete'
import ChangePassword from './update'

export default class PasswordSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPasswordSet: hasEncryptionObservable.value,
      isChangingPassword: false,
      isDeletingPassword: false
    }
  }

  onChangingPassword = () => {
    this.setState({ isChangingPassword: true })
  }

  onDeletingPassword = () => {
    this.setState({ isDeletingPassword: true })
  }

  render() {
    const { isPasswordSet, isChangingPassword, isDeletingPassword } = this.state

    const {
      title,
      explainerEnabled,
      explainerDisabled
    } = labels.passwordSettings

    return (
      <ScrollView>
        <FramedSegment title={title}>
          <AppText>
            {isPasswordSet ? explainerEnabled : explainerDisabled}
          </AppText>

          {!isPasswordSet && <CreatePassword />}

          {isPasswordSet && !isDeletingPassword && (
            <ChangePassword onStartChangingPassword={this.onChangingPassword} />
          )}

          {isPasswordSet && !isChangingPassword && (
            <DeletePassword onStartDeletingPassword={this.onDeletingPassword} />
          )}
        </FramedSegment>
      </ScrollView>
    )
  }
}
