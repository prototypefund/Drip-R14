import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import importCsv from '../../../lib/import-export/import-from-csv'
import alertError from '../common/alert-error'
import Segment from '../../common/segment'
import AppText from '../../common/app-text'
import Button from '../../common/button'
import { useTranslation } from 'react-i18next'
import {
  decryptData,
  encryptData,
} from '../../../lib/import-export/export-encrypted'
import settings from '../../../i18n/en/settings'
import { getCycleDaysSortedByDate, mapRealmObjToJsObj } from '../../../db'
import getDataAsCsvDataUri from '../../../lib/import-export/export-to-csv'
import RNFS from 'react-native-fs'
import { EXPORT_ENCRYPTED } from './constants'
import Share from 'react-native-share'

export default function BackUp({ setIsLoading }) {
  const { t } = useTranslation()

  //TODO: i18n
  async function startImport(shouldDeleteExistingData) {
    setIsLoading(true)
    const fileContent = await fetchData()
    Alert.prompt(
      'Enter password',
      'Enter password that will decrypt & import your backup',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (password) =>
            importAndDecrypt(fileContent, password, shouldDeleteExistingData),
        },
      ],
      'secure-text'
    )
    setIsLoading(false)
  }

  async function exportEncrypted(password) {
    let data
    const labels = settings.export
    const cycleDaysByDate = mapRealmObjToJsObj(getCycleDaysSortedByDate())

    if (!cycleDaysByDate.length) return alertError(labels.errors.noData)

    try {
      data = getDataAsCsvDataUri(cycleDaysByDate)
      data = await encryptData(data, password)
      if (!data) {
        return alertError(labels.errors.noData)
      }
    } catch (err) {
      console.error(err)
      return alertError(labels.errors.couldNotConvert)
    }

    try {
      const path = `${RNFS.DocumentDirectoryPath}/${EXPORT_ENCRYPTED}`
      await RNFS.writeFile(path, data)

      await Share.open({
        title: labels.title,
        url: `file://${path}`,
        subject: labels.subject,
        type: 'text',
        showAppsToView: true,
        failOnCancel: false,
      })
    } catch (err) {
      console.error(err)
      return alertError(labels.errors.problemSharing)
    }
  }
  //Splitting file handling & decrypting into two parts.
  //We want the user to first pick a file and only then be prompted for the password.

  //File handling
  async function getFileInfo() {
    try {
      return await DocumentPicker.pickSingle()
    } catch (error) {
      if (DocumentPicker.isCancel(error)) return // User cancelled the picker, exit any dialogs or menus and move on
      showImportErrorAlert(error)
    }
  }

  async function getFileContent() {
    const fileInfo = await getFileInfo()
    if (!fileInfo) return null

    try {
      const fileContent = await RNFS.readFile(fileInfo.uri, 'utf8')
      return fileContent
    } catch (err) {
      return showImportErrorAlert(t('error.couldNotOpenFile'))
    }
  }

  async function fetchData() {
    const fileContent = await getFileContent()
    if (!fileContent) return
    return fileContent
  }

  //Decryption
  //TODO: Differentiate between parsing error & password error
  async function importAndDecrypt(
    fileContent,
    password,
    shouldDeleteExistingData
  ) {
    try {
      fileContent = await decryptData(fileContent, password)
      await importCsv(fileContent, shouldDeleteExistingData)
      Alert.alert(
        t('hamburgerMenu.settings.data.import.success.title'),
        t('hamburgerMenu.settings.data.import.success.message')
      )
    } catch (err) {
      showImportErrorAlert(err.message)
    }
  }

  function showImportErrorAlert(message) {
    const errorMessage = t('error.noDataImported', { message })
    alertError(errorMessage)
  }

  //TODO: Replace this with i18n
  //TODO: Alert.Prompt is iOs only for now
  return (
    <Segment title="Backup">
      <AppText>Export backups</AppText>
      <Button isCTA onPress={() => startImport(false)}>
        {'Import encrypted'}
      </Button>
      <Button
        isCTA
        onPress={() =>
          Alert.prompt(
            'Enter password',
            'Enter password that will encrypt your backup',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: (password) => exportEncrypted(password),
              },
            ],
            'secure-text'
          )
        }
      >
        {'Export encrypted'}
      </Button>
    </Segment>
  )
}

BackUp.propTypes = {
  resetIsDeletingData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}
