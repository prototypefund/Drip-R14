import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet, View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'

import AppTextInput from '../../common/app-text-input'
import Button from '../../common/button'

import { requestHash, openDb } from '../../../db'
import { Containers } from '../../../styles'
import settings from '../../../i18n/en/settings'
import { shared } from '../../../i18n/en/labels'

const ConfirmWithPassword = ({ onCancel, onSuccess }) => {
  const [password, setPassword] = useState(null)

  useEffect(() => {
    const onIncorrectPassword = () => {
      Alert.alert(shared.incorrectPassword, shared.incorrectPasswordMessage, [
        {
          text: shared.cancel,
          onPress: onCancel,
        },
        {
          text: shared.tryAgain,
          onPress: () => setPassword(null),
        },
      ])
    }

    const checkPassword = async (hash) => {
      try {
        await openDb(hash)
        onSuccess()
      } catch (err) {
        onIncorrectPassword()
      }
    }

    nodejs.channel.addListener('password-check', checkPassword)

    return () => {
      nodejs.channel.removeListener('password-check', checkPassword)
    }
  }, [onCancel, onSuccess])

  const initPasswordCheck = () => requestHash('password-check', password)

  const labels = settings.passwordSettings
  const isPassword = password !== null
  return (
    <React.Fragment>
      <AppTextInput
        onChangeText={setPassword}
        placeholder={labels.enterCurrent}
        value={password}
        secureTextEntry={true}
      />
      <View style={styles.container}>
        <Button onPress={onCancel}>{shared.cancel}</Button>
        <Button
          disabled={!isPassword}
          isCTA={isPassword}
          onPress={initPasswordCheck}
        >
          {shared.confirmToProceed}
        </Button>
      </View>
    </React.Fragment>
  )
}

ConfirmWithPassword.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
  },
})
