import React from 'react'
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import CloseIcon from './close-icon'

import { Sizes, Spacing } from '../../styles'

const AppModal = ({ children, onClose, modalActions }) => (
  <Modal
    animationType="fade"
    onRequestClose={onClose}
    transparent={true}
    visible={true}
  >
    <TouchableOpacity onPress={onClose} style={styles.blackBackground} />
    <View style={styles.modalWindow}>
      <View style={styles.headerContainer}>
        <CloseIcon onClose={onClose} />
      </View>
      {children}
      <View style={styles.footerContainer}>{modalActions}</View>
    </View>
  </Modal>
)

AppModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  modalActions: PropTypes.node,
}

const styles = StyleSheet.create({
  blackBackground: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: Spacing.base,
    paddingHorizontal: Spacing.base,
    width: '100%',
    zIndex: 3, // works on ios
    elevation: 3, // works on android
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    width: '100%',
    // zIndex: 3, // works on ios
    // elevation: 3, // works on android
    flex: 1,
    paddingVertical: Spacing.tiny * 2,
  },
  modalWindow: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: Sizes.huge * 2,
    position: 'absolute',
    maxHeight: Dimensions.get('window').height * 0.8,
    zIndex: 2, // works on ios
    elevation: 2, // works on android
    minWidth: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})

export default AppModal
