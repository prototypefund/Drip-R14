import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, PixelRatio, StyleSheet, View } from 'react-native'

import AppPage from '../common/app-page'

import DayColumn from './day-column'
import HorizontalGrid from './horizontal-grid'
import MainGrid from './main-grid'
import NoData from './no-data'
import NoTemperature from './no-temperature'
import Tutorial from './Tutorial'
import YAxis from './y-axis'

import { getCycleDaysSortedByDate } from '../../db'
import {
  getChartFlag,
  setChartFlag,
  desireTrackingCategoryObservable,
  moodTrackingCategoryObservable,
  noteTrackingCategoryObservable,
  painTrackingCategoryObservable,
  sexTrackingCategoryObservable,
  temperatureTrackingCategoryObservable,
  mucusTrackingCategoryObservable,
  cervixTrackingCategoryObservable,
} from '../../local-storage'
import { makeColumnInfo } from '../helpers/chart'

import {
  CHART_COLUMN_WIDTH,
  CHART_GRID_LINE_HORIZONTAL_WIDTH,
  CHART_SYMPTOM_HEIGHT_RATIO,
  CHART_XAXIS_HEIGHT_RATIO,
  SYMPTOMS,
} from '../../config'
import { Spacing } from '../../styles'

const getSymptomsFromCycleDays = (cycleDays) =>
  SYMPTOMS.filter((symptom) => cycleDays.some((cycleDay) => cycleDay[symptom]))

const CycleChart = ({ navigate, setDate }) => {
  const [shouldShowHint, setShouldShowHint] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function checkShouldShowHint() {
      const flag = await getChartFlag()
      if (isMounted) {
        setShouldShowHint(flag === 'true')
      }
    }

    checkShouldShowHint()

    return () => {
      isMounted = false
    }
  }, [])

  const hideHint = () => {
    setShouldShowHint(false)
    setChartFlag()
  }

  const cycleDaysSortedByDate = getCycleDaysSortedByDate()

  const chartSymptoms = getSymptomsFromCycleDays(cycleDaysSortedByDate)
  const symptomRowSymptoms = chartSymptoms.filter(
    (symptom) => symptom !== 'temperature'
  )

  const symptomRowEnabledSymptoms = symptomRowSymptoms.filter((symptom) => {
    if (symptom === 'sex') {
      return sexTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'mucus') {
      return mucusTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'cervix') {
      return cervixTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'desire') {
      return desireTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'pain') {
      return painTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'mood') {
      return moodTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'note') {
      return noteTrackingCategoryObservable.value ? symptom : null
    } else {
      return symptom
    }
  })

  const isTemperatureEnabled = temperatureTrackingCategoryObservable.value
  const shouldShowTemperatureColumn =
    isTemperatureEnabled && chartSymptoms.indexOf('temperature') > -1
  const shouldShowNoDataWarning =
    isTemperatureEnabled && chartSymptoms.indexOf('temperature') <= -1

  const { width, height } = Dimensions.get('window')
  const numberOfColumnsToRender = Math.round(width / CHART_COLUMN_WIDTH)

  const xAxisHeight = height * 0.7 * CHART_XAXIS_HEIGHT_RATIO
  const remainingHeight = height * 0.7 - xAxisHeight
  const symptomHeight = PixelRatio.roundToNearestPixel(
    remainingHeight * CHART_SYMPTOM_HEIGHT_RATIO
  )
  const symptomRowHeight =
    PixelRatio.roundToNearestPixel(
      symptomRowEnabledSymptoms.length * symptomHeight
    ) + CHART_GRID_LINE_HORIZONTAL_WIDTH
  const columnHeight = remainingHeight - symptomRowHeight

  const chartHeight = shouldShowTemperatureColumn
    ? height * 0.7
    : symptomRowHeight + xAxisHeight

  const columns = makeColumnInfo()

  const renderColumn = ({ item }) => {
    return (
      <DayColumn
        setDate={setDate}
        dateString={item}
        navigate={navigate}
        symptomHeight={symptomHeight}
        columnHeight={columnHeight}
        symptomRowSymptoms={symptomRowEnabledSymptoms}
        chartSymptoms={chartSymptoms}
        shouldShowTemperatureColumn={shouldShowTemperatureColumn}
        xAxisHeight={xAxisHeight}
      />
    )
  }

  const hasDataToDisplay = chartSymptoms.length > 0

  if (!hasDataToDisplay) {
    return <NoData navigate={navigate} />
  }

  return (
    <AppPage
      contentContainerStyle={styles.pageContainer}
      scrollViewStyle={styles.page}
    >
      <View style={styles.chartContainer}>
        {shouldShowHint && <Tutorial onClose={hideHint} />}
        {shouldShowNoDataWarning && <NoTemperature />}
        <View style={styles.chartArea}>
          <YAxis
            height={columnHeight}
            symptomsToDisplay={symptomRowEnabledSymptoms}
            symptomsSectionHeight={symptomRowHeight}
            shouldShowTemperatureColumn={shouldShowTemperatureColumn}
            xAxisHeight={xAxisHeight}
          />
          <MainGrid
            data={columns}
            renderItem={renderColumn}
            initialNumToRender={numberOfColumnsToRender}
            contentContainerStyle={{ height: chartHeight }}
          />
          {shouldShowTemperatureColumn && (
            <HorizontalGrid height={columnHeight} />
          )}
        </View>
      </View>
    </AppPage>
  )
}

CycleChart.propTypes = {
  navigate: PropTypes.func,
  setDate: PropTypes.func,
}

const styles = StyleSheet.create({
  chartArea: {
    flexDirection: 'row',
  },
  chartContainer: {
    flexDirection: 'column',
  },
  page: {
    marginVertical: Spacing.small,
  },
  pageContainer: {
    paddingHorizontal: Spacing.base,
  },
})

export default CycleChart
