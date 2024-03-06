import React, { useState } from 'react'

import AppLoadingView from '../../common/app-loading'
import AppPage from '../../common/app-page'
import AppText from '../../common/app-text'
import Button from '../../common/button'
import Segment from '../../common/segment'

import openShareDialogAndExport from './export-dialog'
import DeleteData from './delete-data'

import labels from '../../../i18n/en/settings'
import ImportData from './ImportData'
import ImportMenu from './ImportMenu'

const DataManagement = ({ restartApp, navigate }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeletingData, setIsDeletingData] = useState(false)
  const [isShowingImport, setIsShowingImport] = useState(false)

  const startExport = () => {
    setIsDeletingData(false)
    openShareDialogAndExport()
  }

  if (isLoading) return <AppLoadingView />
  if (!isShowingImport) {
    return (
      <AppPage>
        <Segment title={labels.export.button}>
          <AppText>{labels.export.segmentExplainer}</AppText>
          <Button isCTA onPress={startExport}>
            {labels.export.button}
          </Button>
        </Segment>
        <ImportData
          resetIsDeletingData={() => setIsDeletingData(false)}
          setIsLoading={setIsLoading}
          setIsShowingImport={setIsShowingImport}
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
  } else {
    return (
      <AppPage>
        <ImportMenu
          onClose={() => setIsShowingImport(false)}
          navigate={navigate}
        />
      </AppPage>
    )
  }
}

export default DataManagement
