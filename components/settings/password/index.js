import React, { useState } from 'react'

import PropTypes from 'prop-types'

import { changeDbEncryption } from '../../../db'

import AppPage from '../../common/app-page'
import AppText from '../../common/app-text'
import Segment from '../../common/segment'

import CreatePassword from './create'
import ChangePassword from './update'
import DeletePassword from './delete'

import { hasEncryptionObservable } from '../../../local-storage'
import labels from '../../../i18n/en/settings'
import { useNavigation } from '../../../hooks/useNavigation'

const PasswordSettings = ({ restartApp }) => {
  const { navigate } = useNavigation()
  const isPasswordSet = hasEncryptionObservable.value
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDeletingPassword, setIsDeletingPassword] = useState(false)

  const { title, explainerEnabled, explainerDisabled } = labels.passwordSettings

  const changeEncryptionAndRestart = async (hash) => {
    await changeDbEncryption(hash)
    await restartApp()
    navigate('Home')
  }

  return (
    <AppPage>
      <Segment title={title} last>
        <AppText>
          {isPasswordSet ? explainerEnabled : explainerDisabled}
        </AppText>

        {!isPasswordSet && (
          <CreatePassword
            changeEncryptionAndRestart={changeEncryptionAndRestart}
          />
        )}

        {isPasswordSet && !isDeletingPassword && (
          <ChangePassword
            onStartChange={() => setIsChangingPassword(true)}
            onCancelChange={() => setIsChangingPassword(false)}
            changeEncryptionAndRestart={changeEncryptionAndRestart}
          />
        )}

        {isPasswordSet && !isChangingPassword && (
          <DeletePassword
            onStartDelete={() => setIsDeletingPassword(true)}
            onCancelDelete={() => setIsDeletingPassword(false)}
            changeEncryptionAndRestart={changeEncryptionAndRestart}
          />
        )}
      </Segment>
    </AppPage>
  )
}

PasswordSettings.propTypes = {
  restartApp: PropTypes.func,
}
export default PasswordSettings
