import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Platform } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import rnfs from 'react-native-fs'
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
import { EXPORT_FILE_NAME } from './constants'
import Share from 'react-native-share'

export default function BackUp({ resetIsDeletingData, setIsLoading }) {
  const { t } = useTranslation(null, {
    keyPrefix: 'hamburgerMenu.settings.data.import',
  })

  async function startImport(shouldDeleteExistingData) {
    setIsLoading(true)
    await importData(shouldDeleteExistingData)
    setIsLoading(false)
  }

  async function startExport() {
    setIsLoading(true)
    await exportEncrypted()
    setIsLoading(false)
  }

  async function exportEncrypted() {
    let data
    const labels = settings.export
    const cycleDaysByDate = mapRealmObjToJsObj(getCycleDaysSortedByDate())

    if (!cycleDaysByDate.length) return alertError(labels.errors.noData)

    try {
      data = getDataAsCsvDataUri(cycleDaysByDate)
      data = await encryptData(data, 'password')
      if (!data) {
        return alertError(labels.errors.noData)
      }
    } catch (err) {
      console.error(err)
      return alertError(labels.errors.couldNotConvert)
    }

    try {
      const path = `${RNFS.DocumentDirectoryPath}/${EXPORT_FILE_NAME}`
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

  async function getFileInfo() {
    try {
      const fileInfo = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.csv, 'text/comma-separated-values'],
      })
      return fileInfo
    } catch (error) {
      if (DocumentPicker.isCancel(error)) return // User cancelled the picker, exit any dialogs or menus and move on
      showImportErrorAlert(error)
    }
  }

  async function getFileContent() {
    const fileInfo = await getFileInfo()
    if (!fileInfo) return null

    try {
      const fileContent = await rnfs.readFile(fileInfo.uri, 'utf8')
      return fileContent
    } catch (err) {
      return showImportErrorAlert(t('error.couldNotOpenFile'))
    }
  }

  async function importData(shouldDeleteExistingData) {
    let fileContent = await getFileContent()
    if (!fileContent) return

    try {
      fileContent = await decryptData(fileContent, 'password')
      await importCsv(fileContent, shouldDeleteExistingData)
      Alert.alert(t('success.title'), t('success.message'))
    } catch (err) {
      showImportErrorAlert(err.message)
    }
  }

  function showImportErrorAlert(message) {
    const errorMessage = t('error.noDataImported', { message })
    alertError(errorMessage)
  }

  return (
    <Segment title="Backup">
      <AppText>Export backups</AppText>
      <Button isCTA onPress={() => startImport(false)}>
        {'Import encrypted'}
      </Button>
      <Button isCTA onPress={() => startExport()}>
        {'Export encrypted'}
      </Button>
    </Segment>
  )
}

BackUp.propTypes = {
  resetIsDeletingData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}
