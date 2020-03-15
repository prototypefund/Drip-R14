import { StyleSheet } from 'react-native'

const purple = '#3A2671'
const purpleLight = '#5D4F8A'
const tourquise = '#69CBC1'
const tourquiseLight = '#CFECEA'
const orange = '#F38337'
const grey = '#A5A5A5'

const textFont = 'Jost-400-Book'
const textFontBold = 'Jost-700-Bold'

const mainTextSize = 20
const mainTextSizeHalf = 10
const mainTextSizeQuarter = 5
const hintTextSize = 16
const titleTextSize = 44

export default StyleSheet.create({
  mainText: {
    color: tourquiseLight,
    fontFamily: textFont,
    fontSize: mainTextSize
  },
  hintText: {
    fontSize: hintTextSize,
    marginLeft: hintTextSize
  },
  whiteText: { color: 'white' },
  orangeText: { color: orange },
  titleText: {
    color: purpleLight,
    fontFamily: textFontBold,
    fontSize: titleTextSize,
    marginBottom: mainTextSizeHalf,
    textTransform: 'lowercase'
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline'
  },
  button: {
    alignItems: 'center',
    backgroundColor: orange,
    borderRadius: 15,
    margin: 30,
    paddingVertical: hintTextSize
  },
  buttonText: {
    color: 'white',
    fontFamily: textFontBold,
    fontSize: hintTextSize,
    textTransform: 'uppercase'
  },
  //Home page styles
  homePageContainer: {
    backgroundColor: purple,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  homeContentContainer: { marginHorizontal: mainTextSize },
  lineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: mainTextSizeQuarter
  }
})

