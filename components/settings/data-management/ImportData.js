import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import rnfs from 'react-native-fs'
import importCsv from '../../../lib/import-export/import-from-csv'
import { importClueOffline } from '../../../lib/import-export/fetchClue'
import alertError from '../common/alert-error'
import Segment from '../../common/segment'
import AppText from '../../common/app-text'
import Button from '../../common/button'
import { useTranslation } from 'react-i18next'

export default function ImportData({
  resetIsDeletingData,
  setIsLoading,
  setIsShowingImport,
}) {
  const { t } = useTranslation(null, {
    keyPrefix: 'hamburgerMenu.settings.data.import',
  })

  async function startImport(shouldDeleteExistingData) {
    setIsLoading(true)
    await importData(shouldDeleteExistingData)
    setIsLoading(false)
  }

  async function getFileInfo(isCsv) {
    try {
      const fileInfo = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.csv, 'text/comma-separated-values'],
      })
      let fileInfo
      if (isCsv) {
        fileInfo = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.csv, 'text/comma-separated-values'],
        })
      } else {
        //pick any (hopefully json)
        fileInfo = await DocumentPicker.pickSingle()
      }

      return fileInfo
    } catch (error) {
      if (DocumentPicker.isCancel(error)) return // User cancelled the picker, exit any dialogs or menus and move on
      showImportErrorAlert(error)
    }
  }

  async function getFileContent(isCsv) {
    const fileInfo = await getFileInfo(isCsv)
    if (!fileInfo) return null

    try {
      const fileContent = await rnfs.readFile(fileInfo.uri, 'utf8')
      return fileContent
    } catch (err) {
      return showImportErrorAlert(t('error.couldNotOpenFile'))
    }
  }

  async function importData(shouldDeleteExistingData) {
    const fileContent = await getFileContent(true)
    if (!fileContent) return

    try {
      await importCsv(fileContent, shouldDeleteExistingData)
      Alert.alert(t('success.title'), t('success.message'))
    } catch (err) {
      showImportErrorAlert(err.message)
    }
  }

  async function importClueFile() {
    setIsLoading(true)
    const fileContent = await getFileContent(false)
    if (!fileContent) return
    try {
      importClueOffline(fileContent)
      setIsLoading(false)
      Alert.alert(t('success.title'), t('success.message'))
    } catch (err) {
      showImportErrorAlert(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  function openImportDialog() {
    resetIsDeletingData()
    Alert.alert(t('dialog.title'), t('dialog.message'), [
      {
        text: t('dialog.cancel'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('dialog.delete'),
        onPress: () => startImport(true),
      },
      {
        text: t('dialog.replace'),
        onPress: () => startImport(false),
      },
    ])
  }

  function openClueImport() {
    resetIsDeletingData()
    Alert.alert(t('dialogClue.title'), t('dialogClue.message'), [
      {
        text: t('dialog.cancel'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('dialogClue.file'),
        onPress: () => importClueFile(),
      },
      {
        text: t('dialogClue.web'),
        onPress: () => startClueImport(),
      },
    ])
  }

  function startClueImport() {
    setIsShowingImport(true) // Show the temporary page
  }

  function showImportErrorAlert(message) {
    const errorMessage = t('error.noDataImported', { message })
    alertError(errorMessage)
  }

  return (
    <Segment title={t('button')}>
      <AppText>{t('segmentExplainer')}</AppText>
      <Button isCTA onPress={openImportDialog}>
        {t('button')}
      </Button>
      <Button isCTA onPress={openClueImport}>
        {t('dialogClue.title')}
      </Button>
    </Segment>
  )
}

ImportData.propTypes = {
  resetIsDeletingData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setIsShowingImport: PropTypes.func.isRequired,
}
