import React, { Component } from 'react'
import { Alert, ToastAndroid } from 'react-native'
import RNFS from 'react-native-fs'

import { clearDb, isDbEmpty } from '../../../db'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import settings from '../../../i18n/en/settings'
import { hasEncryptionObservable } from '../../../local-storage'
import alertError from '../shared/alert-error'
import ConfirmWithPassword from '../shared/confirm-with-password'
import SettingsButton from '../shared/settings-button'
import { EXPORT_FILE_NAME } from './constants'

const exportedFilePath = `${RNFS.DocumentDirectoryPath}/${EXPORT_FILE_NAME}`

export default class DeleteData extends Component {
  constructor() {
    super()
    this.state = {
      isPasswordSet: hasEncryptionObservable.value,
      isConfirmingWithPassword: false
    }
  }

  onAlertConfirmation = () => {
    if (this.state.isPasswordSet) {
      this.setState({ isConfirmingWithPassword: true })
    } else {
      this.deleteAppData()
    }
  }

  alertBeforeDeletion = async () => {
    const { question, message, confirmation, errors } = settings.deleteSegment
    if (isDbEmpty() && !(await RNFS.exists(exportedFilePath))) {
      alertError(errors.noData)
    } else {
      Alert.alert(question, message, [
        {
          text: confirmation,
          onPress: this.onAlertConfirmation
        },
        {
          text: sharedLabels.cancel,
          style: 'cancel',
          onPress: this.cancelConfirmationWithPassword
        }
      ])
    }
  }

  deleteExportedFile = async () => {
    if (await RNFS.exists(exportedFilePath)) {
      await RNFS.unlink(exportedFilePath)
    }
  }

  deleteAppData = async () => {
    const { errors, success } = settings.deleteSegment

    try {
      if (!isDbEmpty()) {
        clearDb()
      }
      await this.deleteExportedFile()
      ToastAndroid.show(success.message, ToastAndroid.LONG)
    } catch (err) {
      alertError(errors.couldNotDeleteFile)
    }
    this.cancelConfirmationWithPassword()
  }

  cancelConfirmationWithPassword = () => {
    this.setState({ isConfirmingWithPassword: false })
  }

  render() {
    const { isConfirmingWithPassword } = this.state

    if (isConfirmingWithPassword) {
      return (
        <ConfirmWithPassword
          onSuccess={this.deleteAppData}
          onCancel={this.cancelConfirmationWithPassword}
        />
      )
    }

    return (
      <SettingsButton onPress={this.alertBeforeDeletion}>
        {settings.deleteSegment.title}
      </SettingsButton>
    )
  }
}
