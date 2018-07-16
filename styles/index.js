import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    margin: 30,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  cycleDayNumber: {
    fontSize: 18,
    margin: 15,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  symptomDayView: {
    fontSize: 20,
    textAlignVertical: 'center'
  },
  radioButton: {
    fontSize: 18,
    margin: 8,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  symptomEditView: {
    justifyContent: 'space-between',
    marginHorizontal: 15
  },
  symptomEditRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  symptomViewRowInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    height: 50
  },
  cycleDayDateView: {
    justifyContent: 'center',
    backgroundColor: 'steelblue'
  },
  cycleDayNumberView: {
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    marginBottom: 15
  },
  homeButtons: {
    marginHorizontal: 15
  },
  homeButton: {
    marginBottom: 15
  },
  temperatureTextInput: {
    width: 80,
    textAlign: 'center',
    fontSize: 20
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50
  },
  symptomEditButton: {
    width: 130
  },
  radioButtonRow: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})