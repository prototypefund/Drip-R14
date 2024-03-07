import React, { useState } from 'react'

import { View, Text, Alert } from 'react-native'
import AppPage from '../../common/app-page'
import AppText from '../../common/app-text'
import AppTextInput from '../../common/app-text-input'
import { importClue } from '../../../lib/import-export/fetchClue'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import Button from '../../common/button'
import { useInternetConnection } from '../../../lib/import-export/useInternetConnection'
import {
  AuthenticationError,
  NetworkError,
  ParsingError,
} from '../../../lib/import-export/ErrorTypes'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
const ImportMenu = ({ onClose, navigate }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { hasInternetPermission, isConnected } = useInternetConnection(navigate)

  return (
    <AppPage title={t('import.texts.title')}>
      <AppText style={styles.explainerText}>
        {t('import.texts.explainer')}
        {'\n\n'}
        <Text style={styles.boldText}>
          {t('import.texts.privacy.title')}
        </Text>{' '}
        {'\n'}
        {t('import.texts.privacy.description')}
        {'\n\n'}
        <Text style={styles.boldText}>{t('import.texts.onetime.title')}</Text>
        {'\n'}
        {t('import.texts.onetime.description')}
        {'\n\n'}
        <Text style={styles.boldText}>{t('import.texts.control.title')}</Text>
        {'\n'}
        {t('import.texts.control.description')}
        {'\n\n'}
        <Text style={styles.boldText}>
          {t('import.texts.alternative.title')}
        </Text>
        {'\n'}
        {t('import.texts.alternative.description')}
        {'\n\n'}
        <Text style={styles.boldText}>{t('import.texts.choice.title')}</Text>
        {'\n'}
        {t('import.texts.choice.description')}
        {'\n\n'}
        <Text style={styles.boldText}>{t('import.texts.ready.title')}</Text>
        {'\n'}
        {t('import.texts.ready.description', {
          button: t('import.texts.submit'),
        })}
        {'\n\n'}
      </AppText>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
        <View style={styles.inputContainer}>
          <AppTextInput
            placeholder={t('import.texts.email')}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <AppTextInput
            placeholder={t('import.texts.password')}
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <Button
          isCTA
          onPress={async () => {
            if (hasInternetPermission) {
              if (isConnected) {
                try {
                  await importClue(email, password)
                  Alert.alert(
                    t('hamburgerMenu.settings.data.import.success.title'),
                    t('hamburgerMenu.settings.data.import.success.message')
                  )
                } catch (error) {
                  if (
                    error instanceof NetworkError ||
                    error.message.includes('Network')
                  ) {
                    Alert.alert(
                      t('import.errors.network.title'),
                      t('import.errors.network.message')
                    )
                  } else if (error instanceof AuthenticationError) {
                    Alert.alert(
                      t('import.errors.auth.title'),
                      t('import.errors.auth.message')
                    )
                  } else if (error instanceof ParsingError) {
                    Alert.alert(
                      t('import.errors.parsing.title'),
                      t('import.errors.parsing.message')
                    )
                  }
                }
              } else {
                Alert.alert(
                  t('import.errors.network.title'),
                  t('import.errors.network.message')
                )
              }
            } else {
              Alert.alert(
                t('import.errors.permissions.title'),
                t('import.errors.permissions.message')
              )
            }
          }}
        >
          {t('import.texts.submit')}
        </Button>
        <Button isCTA onPress={onClose}>
          {t('import.texts.close')}
        </Button>
      </KeyboardAvoidingView>
    </AppPage>
  )
}

ImportMenu.propTypes = {
  navigate: PropTypes.func,
  onClose: PropTypes.func,
}

export default ImportMenu

const styles = StyleSheet.create({
  explainerText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})
