import nodejs from 'nodejs-mobile-react-native'
import React, { Component } from 'react'
import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native'

import { deleteDbAndOpenNew, openDb, requestHash } from '../db'
import { passwordPrompt as labels, shared } from '../i18n/en/labels'
import { saveEncryptionFlag } from '../local-storage'
import styles from '../styles'
import AppText from './app-text'

export default class PasswordPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null
    }

    nodejs.channel.addListener('check-pw', this.passHashToDb, this)

    this.tryToOpenDb()
  }

  async tryToOpenDb() {
    const connected = await openDb()
    if (!connected) {
      this.setState({ showPasswordPrompt: true })
      await saveEncryptionFlag(true)
      return
    }
    await saveEncryptionFlag(false)
    this.props.showApp()
  }

  passHashToDb = async hash => {
    const connected = await openDb(hash)
    if (!connected) {
      Alert.alert(shared.incorrectPassword, shared.incorrectPasswordMessage, [
        {
          text: shared.tryAgain,
          onPress: () => this.setState({ password: null })
        }
      ])
      return
    }
    this.props.showApp()
  }

  confirmDeletion = async () => {
    Alert.alert(labels.deleteDatabaseTitle, labels.deleteDatabaseExplainer, [
      {
        text: shared.cancel,
        style: 'cancel'
      },
      {
        text: labels.deleteData,
        onPress: () => {
          Alert.alert(labels.areYouSureTitle, labels.areYouSure, [
            {
              text: shared.cancel,
              style: 'cancel'
            },
            {
              text: labels.reallyDeleteData,
              onPress: async () => {
                await deleteDbAndOpenNew()
                await saveEncryptionFlag(false)
                this.props.showApp()
              }
            }
          ])
        }
      }
    ])
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('check-pw', this.passHashToDb)
  }

  render() {
    return (
      <View flex={1}>
        {this.state.showPasswordPrompt && (
          <View style={styles.passwordPromptPage}>
            <Image
              source={require('../assets/drip_small.png')}
              style={styles.passwordPromptImage}
            />
            <TextInput
              onChangeText={val => this.setState({ password: val })}
              style={styles.passwordPromptField}
              secureTextEntry={true}
              placeholder={labels.enterPassword}
            />
            <TouchableOpacity
              style={styles.passwordPromptButton}
              onPress={() => {
                requestHash('check-pw', this.state.password)
              }}
              disabled={!this.state.password}
            >
              <AppText style={styles.passwordPromptButtonText}>
                {labels.title}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.confirmDeletion}>
              <AppText style={styles.passwordPromptForgotPasswordText}>
                {labels.forgotPassword}
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}
