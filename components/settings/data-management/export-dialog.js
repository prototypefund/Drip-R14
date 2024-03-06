import Share from 'react-native-share'

import { getCycleDaysSortedByDate, mapRealmObjToJsObj } from '../../../db'
import getDataAsCsvDataUri from '../../../lib/import-export/export-to-csv'
import alertError from '../common/alert-error'
import settings from '../../../i18n/en/settings'
import { EXPORT_FILE_NAME } from './constants'
import RNFS from 'react-native-fs'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import { generateOverview } from '../../../lib/import-export/export/make-pdf'
import labels from '../../../i18n/en/settings'

export async function exportCSV() {
  let data
  const labels = settings.export
  const cycleDaysByDate = mapRealmObjToJsObj(getCycleDaysSortedByDate())

  if (!cycleDaysByDate.length) return alertError(labels.errors.noData)

  try {
    data = getDataAsCsvDataUri(cycleDaysByDate)
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
      type: 'text/csv',
      showAppsToView: true,
      failOnCancel: false,
    })
  } catch (err) {
    console.error(err)
    return alertError(labels.errors.problemSharing)
  }
}

export async function exportPDF(t) {
  try {
    const pdf = await RNHTMLtoPDF.convert({
      html: generateOverview(t),
      fileName: 'drip-export-pdf',
      base64: true,
      width: 794,
      height: 1123,
      padding: 0,
    })

    await Share.open({
      title: labels.title,
      url: `file://${pdf.filePath}`,
      subject: labels.subject,
      type: 'pdf',
      showAppsToView: true,
      failOnCancel: false,
    })
  } catch (err) {
    console.error(err)
    return alertError(labels.errors.problemSharing)
  }
}
