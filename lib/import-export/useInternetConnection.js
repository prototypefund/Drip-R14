import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { useTranslation } from 'react-i18next'

export function useInternetConnection(navigate) {
  const [hasInternetPermission, setHasInternetPermission] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Request internet permission when the component using this hook mounts
    requestInternetPermission()
  }, [])

  const { t } = useTranslation()
  const requestInternetPermission = async () => {
    try {
      Alert.alert(t('import.internet.title'), t('import.internet.message'), [
        {
          text: 'No',
          onPress: () => {
            setHasInternetPermission(false)
            navigate('SettingsMenu')
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setHasInternetPermission(true)
            checkInternetConnection()
          },
        },
      ])
    } catch (error) {
      console.warn('Error requesting INTERNET permission:', error)
    }
  }

  const checkInternetConnection = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected)
    })
  }
  return { hasInternetPermission, isConnected }
}
