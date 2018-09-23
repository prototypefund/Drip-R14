import config from '../../config'
import {primaryColor, shadesOfRed} from '../../styles/index'

const colorTemperature = '#765285'
const colorTemperatureLight = '#a67fb5'
const dotRadius = 5
const lineWidth = 1.5
const colorLtl = '#feb47b'
const gridColor = 'lightgrey'
const gridLineWidth = 0.5

const styles = {
  curve: {
    stroke: colorTemperature,
    strokeWidth: lineWidth,
  },
  curveExcluded: {
    stroke: colorTemperatureLight,
    strokeWidth: lineWidth
  },
  curveDots: {
    fill: colorTemperature,
    r: dotRadius
  },
  curveDotsExcluded: {
    fill: colorTemperatureLight,
    r: dotRadius
  },
  column: {
    label: {
      date: {
        color: 'grey',
        fontSize: 9,
        fontWeight: '100',
      },
      number: {
        color: primaryColor,
        fontSize: 13,
        textAlign: 'center',
      }
    },
    rect: {
      x:'0',
      y:'0',
      width: config.columnWidth,
      stroke: gridColor,
      strokeWidth: gridLineWidth,
      fill: 'transparent'
    }
  },
  symptomIcon: {
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  iconShades: {
    'bleeding': shadesOfRed,
    'mucus': [
      '#e8f6a4',
      '#bccd67',
      '#91a437',
      '#6a7b15',
      '#445200',
    ],
    'cervix': [
      '#f0e19d',
      '#e9d26d',
      '#e2c33c',
      '#dbb40c',
    ],
    'sex': [
      '#A66FA6',
      '#8A458A',
      '#6f2565',
    ],
    'desire': [
      '#68113f',
      '#8b2e5f',
      '#ad5784',
    ],
    'pain': ['#7689A9'],
    'note': ['#6CA299']
  },
  yAxis: {
    width: 27,
    borderRightWidth: 1,
    borderColor: 'lightgrey',
    borderStyle: 'solid'
  },
  yAxisLabel: {
    position: 'absolute',
    right: 2,
    color: 'grey',
    fontSize: 9,
    textAlign: 'left'
  },
  horizontalGrid: {
    position:'absolute',
    borderColor: gridColor,
    borderWidth: gridLineWidth,
    width: '100%',
    borderStyle: 'solid',
    left: config.columnWidth
  },
  nfpLine: {
    stroke: colorLtl,
    strokeWidth: lineWidth,
  },
  symptomRow: {
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export default styles