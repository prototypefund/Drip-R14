import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from '../common/app-text'
import Button from '../common/button'

import { Containers } from '../../styles'
import { shared } from '../../i18n/en/labels'
import { useNavigation } from '../../hooks/useNavigation'

const NoData = () => {
  const { navigate } = useNavigation()
  return (
    <View style={styles.container}>
      <AppText>{shared.noDataWarning}</AppText>
      <Button
        isCTA
        onPress={() => {
          navigate('CycleDay')
        }}
      >
        {shared.noDataButtonText}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Containers.centerItems,
  },
})

export default NoData
