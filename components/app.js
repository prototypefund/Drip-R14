import React, { useEffect } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import Header from './header'
import Menu from './menu'
import { viewsList } from './views'
import { isSettingsView } from './pages'

import { headerTitles } from '../i18n/en/labels'
import { getCycleDay, closeDb } from '../db'
import { useDate } from '../hooks/useDate'
import { useNavigation } from '../hooks/useNavigation'
import useSetupNotifications from '../hooks/useNotifications'

const App = ({ restartApp }) => {
  useSetupNotifications()
  const { date } = useDate()
  const { currentPage, navigateBack } = useNavigation()
  const Page = viewsList[currentPage]
  const title = headerTitles[currentPage]

  const isSettingsSubView = isSettingsView(currentPage)
  const isTemperatureEditView = currentPage === 'TemperatureEditView'

  const headerProps = {
    title,
    handleBack: isSettingsSubView ? navigateBack : null,
  }

  const pageProps = {
    cycleDay: date && getCycleDay(date),
    date,
    isTemperatureEditView,
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      sendUserBack
    )

    return () => {
      backHandler.remove()
    }
  }, [])

  const sendUserBack = () => {
    if (currentPage === 'Home') {
      closeDb()
      BackHandler.exitApp()
    } else {
      navigateBack()
    }

    return true
  }

  if (!currentPage) {
    return null
  }

  return (
    <View style={styles.container}>
      <Header {...headerProps} />
      <Page {...pageProps} restartApp={restartApp} />
      <Menu />
    </View>
  )
}

App.propTypes = {
  restartApp: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
