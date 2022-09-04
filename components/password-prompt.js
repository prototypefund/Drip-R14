import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet, View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'

import AppPage from './common/app-page'
import AppTextInput from './common/app-text-input'
import Button from './common/button'
import Header from './header'

import { saveEncryptionFlag } from '../local-storage'
import { requestHash, deleteDbAndOpenNew, openDb } from '../db'
import { passwordPrompt as labels, shared } from '../i18n/en/labels'
import { Containers, Spacing } from '../styles'

const cancelButton = { text: shared.cancel, style: 'cancel' }

const PasswordPrompt = ({ enableShowApp }) => {
  const [password, setPassword] = useState('')

  useEffect(() => {
    const passHashToDb = async (hash) => {
      const connected = await openDb(hash)
      if (!connected) {
        Alert.alert(shared.incorrectPassword, shared.incorrectPasswordMessage, [
          {
            text: shared.tryAgain,
            onPress: () => setPassword(null),
          },
        ])
        return
      }
      enableShowApp()
    }

    nodejs.channel.addListener('check-pw', passHashToDb)

    return () => {
      nodejs.channel.removeListener('check-pw', passHashToDb)
    }
  }, [enableShowApp])

  const onConfirmDeletion = async () => {
    Alert.alert(labels.deleteDatabaseTitle, labels.deleteDatabaseExplainer, [
      cancelButton,
      { text: labels.deleteData, onPress: onDeleteData },
    ])
  }

  const onDeleteData = () => {
    Alert.alert(labels.areYouSureTitle, labels.areYouSure, [
      cancelButton,
      {
        text: labels.reallyDeleteData,
        onPress: async () => {
          await deleteDbAndOpenNew()
          await saveEncryptionFlag(false)
          enableShowApp()
        },
      },
    ])
  }

  const isPasswordEntered = Boolean(password)

  return (
    <React.Fragment>
      <Header isSideMenuEnabled={false} />
      <AppPage contentContainerStyle={styles.contentContainer}>
        <AppTextInput
          isKeyboardOffset={false}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder={labels.enterPassword}
        />
        <View style={styles.containerButtons}>
          <Button onPress={onConfirmDeletion}>{labels.forgotPassword}</Button>
          <Button
            disabled={!isPasswordEntered}
            isCTA={isPasswordEntered}
            onPress={() => requestHash('check-pw', password)}
          >
            {labels.title}
          </Button>
        </View>
      </AppPage>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: Spacing.base,
  },
  containerButtons: {
    ...Containers.rowContainer,
    justifyContent: 'space-around',
  },
})

PasswordPrompt.propTypes = {
  enableShowApp: PropTypes.func.isRequired,
}

export default PasswordPrompt
