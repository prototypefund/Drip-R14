import React, { useState } from 'react'

import AppLoadingView from '../../common/app-loading'
import AppPage from '../../common/app-page'
import AppText from '../../common/app-text'
import Button from '../../common/button'
import Segment from '../../common/segment'

import { exportData, exportEncrypted } from './export-dialog'
import DeleteData from './delete-data'

import labels from '../../../i18n/en/settings'
import ImportData from './ImportData'
import { encryptData } from '../../../lib/import-export/export-encrypted'
import BackUp from './BackUp'

const DataManagement = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeletingData, setIsDeletingData] = useState(false)

  const startExport = () => {
    setIsDeletingData(false)
    exportData()
  }

  const startEncryptedExport = () => {
    exportEncrypted()
    encryptData('all,the,date,is,here,all', 'thisispassword')
  }

  if (isLoading) return <AppLoadingView />

  return (
    <AppPage>
      <Segment title={labels.export.button}>
        <AppText>{labels.export.segmentExplainer}</AppText>
        <Button isCTA onPress={startExport}>
          {labels.export.button}
        </Button>
        <Button isCTA onPress={startEncryptedExport}>
          {labels.export.button}
        </Button>
      </Segment>
      <ImportData
        resetIsDeletingData={() => setIsDeletingData(false)}
        setIsLoading={setIsLoading}
      />
      <BackUp
        resetIsDeletingData={() => setIsDeletingData(false)}
        setIsLoading={setIsLoading}
      />
      <Segment title={labels.deleteSegment.title} last>
        <AppText>{labels.deleteSegment.explainer}</AppText>
        <DeleteData
          isDeletingData={isDeletingData}
          onStartDeletion={() => setIsDeletingData(true)}
        />
      </Segment>
    </AppPage>
  )
}

export default DataManagement
