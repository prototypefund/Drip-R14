import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import range from 'date-range'
import Svg,{
  G,
  Rect,
  Text,
  Circle,
  Line,
  Path
} from 'react-native-svg'
import { LocalDate } from 'js-joda'
import { getCycleDay, getOrCreateCycleDay, cycleDaysSortedByDate } from '../db'
import getCycleDayNumberModule from '../get-cycle-day-number'
import styles from './styles'
import config from './config'

const getCycleDayNumber = getCycleDayNumberModule()


export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: makeColumnInfo(config.cycleDaysToShow)
    }

    this.reCalculateChartInfo = (function(Chart) {
      return function() {
        Chart.setState({columns: makeColumnInfo(config.cycleDaysToShow)})
      }
    })(this)

    cycleDaysSortedByDate.addListener(this.reCalculateChartInfo)
  }

  componentWillUnmount() {
    cycleDaysSortedByDate.removeListener(this.reCalculateChartInfo)
  }

  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigation.navigate('cycleDay', { cycleDay })
  }

  makeDayColumn({ dateString, cycleDay, y }, index) {
    const cycleDayNumber = getCycleDayNumber(dateString)
    const label = styles.column.label
    const dateLabel = dateString.split('-').slice(1).join('-')

    return (
      <G onPress={() => this.passDateToDayView(dateString)}>
        <Rect {...styles.column.rect} />
        <Text {...label.number} y={config.cycleDayNumberRowY}>{cycleDayNumber}</Text>
        <Text {...label.date} y={config.dateRowY}>{dateLabel}</Text>

        {cycleDay && cycleDay.bleeding ?
          <Path {...styles.bleedingIcon}
            d="M15 3
              Q16.5 6.8 25 18
              A12.8 12.8 0 1 1 5 18
              Q13.5 6.8 15 3z" />
          : null}

        {y ? this.drawDotAndLines(y, cycleDay.temperature.exclude, index) : null}
      </G>
    )
  }

  drawDotAndLines(currY, exclude, index) {
    let lineToRight
    let lineToLeft
    const cols = this.state.columns

    function makeLine(otherColY, x, excludeLine) {
      const middleY = ((otherColY - currY) / 2) + currY
      const target = [x, middleY]
      const lineStyle = excludeLine ? styles.curveExcluded : styles.curve

      return <Line
        x1={config.columnMiddle}
        y1={currY}
        x2={target[0]}
        y2={target[1]}
        {...lineStyle}
      />
    }

    const thereIsADotToTheRight = index > 0 && cols[index - 1].y
    const thereIsADotToTheLeft = index < cols.length - 1 && cols[index + 1].y

    if (thereIsADotToTheRight) {
      const otherDot = cols[index - 1]
      const excludedLine = otherDot.cycleDay.temperature.exclude || exclude
      lineToRight = makeLine(otherDot.y, config.columnWidth, excludedLine)
    }
    if (thereIsADotToTheLeft) {
      const otherDot = cols[index + 1]
      const excludedLine = otherDot.cycleDay.temperature.exclude || exclude
      lineToLeft = makeLine(otherDot.y, 0, excludedLine)
    }

    const dotStyle = exclude ? styles.curveDotsExcluded : styles.curveDots
    return (<G>
      {lineToRight}
      {lineToLeft}
      <Circle
        cx={config.columnMiddle}
        cy={currY}
        {...dotStyle}
      />
    </G>)
  }

  placeTicksForYAxis() {
    const scaleMin = config.temperatureScale.low
    const scaleMax = config.temperatureScale.high
    const numberOfTicks = (scaleMax - scaleMin) * 2
    const tickDistance = config.chartHeight / numberOfTicks
    const ticks = []
    const labelStyle = styles.column.label.date
    for (let i = 0; i < numberOfTicks; i++) {
      const y = tickDistance * i
      ticks.push(
        <G key={i}>
          <Line
            x1={18} y1={y} x2={22} y2={y}
            {...styles.yAxis}
          />
          <Text {...labelStyle} y={y}>{scaleMax - i * 0.5}</Text>
        </G>
      )
    }
    return ticks
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Svg {...styles.yAxis}>
          {this.placeTicksForYAxis()}
        </Svg>
        <FlatList
          horizontal={true}
          inverted={true}
          data={this.state.columns}
          renderItem={({ item, index }) => {
            return (
              <Svg width={config.columnWidth} height={config.chartHeight}>
                {this.makeDayColumn(item, index)}
              </Svg>
            )
          }}
          keyExtractor={item => item.dateString}
        >
        </FlatList>
      </View>
    )
  }
}

function makeColumnInfo(n) {
  const xAxisDates = getPreviousDays(n).map(jsDate => {
    return LocalDate.of(
      jsDate.getFullYear(),
      jsDate.getMonth() + 1,
      jsDate.getDate()
    ).toString()
  })

  return xAxisDates.map(dateString => {
    const cycleDay = getCycleDay(dateString)
    const temp = cycleDay && cycleDay.temperature && cycleDay.temperature.value
    return {
      dateString,
      cycleDay,
      y: temp ? normalizeToScale(temp) : null
    }
  })
}

function getPreviousDays(n) {
  const today = new Date()
  today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0)
  const twoWeeksAgo = new Date(today - (range.DAY * n))

  return range(twoWeeksAgo, today).reverse()
}

function normalizeToScale(temp) {
  const temperatureScale = config.temperatureScale
  const valueRelativeToScale = (temperatureScale.high - temp) / (temperatureScale.high - temperatureScale.low)
  const scaleHeight = config.chartHeight
  return scaleHeight * valueRelativeToScale
}