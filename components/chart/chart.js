import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  PixelRatio,
  StyleSheet,
  View,
} from 'react-native'

import AppLoadingView from '../common/app-loading'
import AppPage from '../common/app-page'
import AppText from '../common/app-text'

import DayColumn from './day-column'
import HorizontalGrid from './horizontal-grid'
import NoData from './no-data'
import Tutorial from './tutorial'
import YAxis from './y-axis'

import { getCycleDaysSortedByDate } from '../../db'
import nothingChanged from '../../db/db-unchanged'
import {
  getChartFlag,
  scaleObservable,
  setChartFlag,
} from '../../local-storage'
import { makeColumnInfo, nfpLines } from '../helpers/chart'

import {
  CHART_COLUMN_WIDTH,
  CHART_GRID_LINE_HORIZONTAL_WIDTH,
  CHART_SYMPTOM_HEIGHT_RATIO,
  CHART_XAXIS_HEIGHT_RATIO,
  SYMPTOMS,
} from '../../config'
import { shared } from '../../i18n/en/labels'
import { Colors, Spacing } from '../../styles'
import { useNavigation } from '../../hooks/useNavigation'

const CycleChart = () => {
  const { navigate } = useNavigation()
  const cycleDaysSortedByDate = getCycleDaysSortedByDate()
  const getFhmAndLtlInfo = nfpLines()
  const [shouldShowTemperatureColumn, setShouldShowTemperatureColumn] =
    useState(false)
  const [state, setState] = useState({})

  useEffect(() => {
    checkShouldShowHint()
    prepareSymptomData()

    return () => {
      cycleDaysSortedByDate.removeListener(handleDbChange)
      removeObvListener()
    }
  }, [])

  const checkShouldShowHint = async () => {
    const flag = await getChartFlag()
    const shouldShowHint = flag === 'true' ? true : false
    setState((state) => ({
      ...state,
      shouldShowHint,
    }))
  }

  const setShouldShowHint = async () => {
    await setChartFlag()
    setState((state) => ({
      ...state,
      shouldShowHint: false,
    }))
  }

  const onLayout = () => {
    if (state.chartHeight) return false

    reCalculateChartInfo()
    updateListeners(reCalculateChartInfo)
  }

  const prepareSymptomData = () => {
    const symptomRowSymptoms = SYMPTOMS.filter((symptomName) => {
      return cycleDaysSortedByDate.some((cycleDay) => {
        return symptomName !== 'temperature' && cycleDay[symptomName]
      })
    })

    const chartSymptoms = [...symptomRowSymptoms]
    setState((state) => ({
      ...state,
      symptomRowSymptoms,
      chartSymptoms,
    }))
    if (cycleDaysSortedByDate.some((day) => day.temperature)) {
      chartSymptoms.push('temperature')
      setShouldShowTemperatureColumn(true)
    }
  }

  const renderColumn = ({ item, index }) => {
    return (
      <DayColumn
        dateString={item}
        index={index}
        navigate={navigate}
        symptomHeight={state.symptomHeight}
        columnHeight={state.columnHeight}
        symptomRowSymptoms={state.symptomRowSymptoms}
        chartSymptoms={state.chartSymptoms}
        shouldShowTemperatureColumn={shouldShowTemperatureColumn}
        getFhmAndLtlInfo={getFhmAndLtlInfo}
        xAxisHeight={state.xAxisHeight}
      />
    )
  }
  const reCalculateChartInfo = () => {
    const { width, height } = Dimensions.get('window')

    const xAxisHeight = height * 0.7 * CHART_XAXIS_HEIGHT_RATIO
    const remainingHeight = height * 0.7 - xAxisHeight
    const symptomHeight = PixelRatio.roundToNearestPixel(
      remainingHeight * CHART_SYMPTOM_HEIGHT_RATIO
    )
    const symptomRowHeight =
      PixelRatio.roundToNearestPixel(
        state.symptomRowSymptoms.length * symptomHeight
      ) + CHART_GRID_LINE_HORIZONTAL_WIDTH
    const chartHeight = shouldShowTemperatureColumn
      ? height * 0.7
      : symptomRowHeight + xAxisHeight
    const columnHeight = remainingHeight - symptomRowHeight
    const numberOfColumnsToRender = Math.round(width / CHART_COLUMN_WIDTH)
    const columns = makeColumnInfo()

    setState((state) => ({
      ...state,
      columns,
      columnHeight,
      chartHeight,
      numberOfColumnsToRender,
      symptomHeight,
      xAxisHeight,
    }))
  }

  const handleDbChange = (_, changes) => {
    if (nothingChanged(changes)) return
    reCalculateChartInfo()
  }

  const removeObvListener = scaleObservable(reCalculateChartInfo, false)

  const updateListeners = () => {
    // remove existing listeners
    if (handleDbChange) {
      cycleDaysSortedByDate.removeListener(handleDbChange)
    }
    if (removeObvListener) removeObvListener()

    cycleDaysSortedByDate.addListener(handleDbChange)
  }
  const { chartHeight, chartLoaded, shouldShowHint, numberOfColumnsToRender } =
    state
  const hasDataToDisplay = state.chartSymptoms?.length > 0

  return (
    <AppPage
      contentContainerStyle={styles.pageContainer}
      onLayout={onLayout}
      scrollViewStyle={styles.page}
    >
      {!hasDataToDisplay && <NoData />}
      {hasDataToDisplay && !chartHeight && !chartLoaded && <AppLoadingView />}
      <View style={styles.chartContainer}>
        {shouldShowHint && chartLoaded && (
          <Tutorial onClose={setShouldShowHint} />
        )}
        {hasDataToDisplay && chartLoaded && !shouldShowTemperatureColumn && (
          <View style={styles.centerItem}>
            <AppText style={styles.warning}>
              {shared.noTemperatureWarning}
            </AppText>
          </View>
        )}
        {hasDataToDisplay && (
          <View style={styles.chartArea}>
            {chartHeight && chartLoaded && (
              <YAxis
                height={state.columnHeight}
                symptomsToDisplay={state.symptomRowSymptoms}
                symptomsSectionHeight={state.symptomRowHeight}
                shouldShowTemperatureColumn={shouldShowTemperatureColumn}
                xAxisHeight={state.xAxisHeight}
              />
            )}

            {chartHeight && (
              <FlatList
                horizontal={true}
                inverted={true}
                showsHorizontalScrollIndicator={false}
                data={state.columns}
                renderItem={renderColumn}
                keyExtractor={(item) => item}
                initialNumToRender={numberOfColumnsToRender}
                windowSize={30}
                onLayout={() => setState({ chartLoaded: true })}
                onEndReached={() => setState({ end: true })}
                ListFooterComponent={<LoadingMoreView end={state.end} />}
                updateCellsBatchingPeriod={800}
                contentContainerStyle={{ height: chartHeight }}
              />
            )}
            {chartHeight && chartLoaded && (
              <React.Fragment>
                {shouldShowTemperatureColumn && (
                  <HorizontalGrid height={state.columnHeight} />
                )}
              </React.Fragment>
            )}
          </View>
        )}
      </View>
    </AppPage>
  )
}

function LoadingMoreView({ end }) {
  return (
    <View style={styles.loadingContainer}>
      {!end && <ActivityIndicator size={'large'} color={Colors.orange} />}
    </View>
  )
}

LoadingMoreView.propTypes = {
  end: PropTypes.bool,
}

const styles = StyleSheet.create({
  chartArea: {
    flexDirection: 'row',
  },
  chartContainer: {
    flexDirection: 'column',
  },
  loadingContainer: {
    height: '100%',
    backgroundColor: Colors.turquoiseLight,
    justifyContent: 'center',
  },
  page: {
    marginVertical: Spacing.small,
  },
  pageContainer: {
    paddingHorizontal: Spacing.base,
  },
  warning: {
    padding: Spacing.large,
  },
})

export default CycleChart

CycleChart.propTypes = {
  end: PropTypes.bool,
}
