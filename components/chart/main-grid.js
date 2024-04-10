import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'

import LoadingMoreView from './loading-more'

const MainGrid = (props) => {
  const flatListRef = useRef()
  const [endReached, setEndReached] = useState(false)
  /**
   *   This is where the actual "jumping" happens.
   *   The index of the date to be jumped to is found and the chart scrolls to the index.
   *   If the date is not found (future date!), it jumps to the current date.
   *   @param date {string} format "YYYY-MM-DD"
   */
  const jumpToDate = (date) => {
    let index = props.data.findIndex((item) => item === date)
    //TO-DO: Replace 7 with initial numtorender? this decides where we "land" on the chart
    if (index !== -1) {
      index = Math.max(0, index - 7)
      flatListRef.current.scrollToIndex({ animated: false, index })
    }
  }

  useEffect(() => {
    if (props.date) {
      jumpToDate(props.date)
    }
  }, [props.date])

  return (
    <FlatList
      ref={flatListRef}
      horizontal={true}
      inverted={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      windowSize={30}
      onEndReached={() => setEndReached(true)}
      ListFooterComponent={<LoadingMoreView end={endReached} />}
      updateCellsBatchingPeriod={800}
      getItemLayout={
        (data, index) => ({
          length: 32,
          offset: 32 * index,
          index,
        }) //TODO: Replace with item width
      }
      {...props}
    />
  )
}

MainGrid.propTypes = {
  height: PropTypes.number,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  initialNumToRender: PropTypes.number,
  contentContainerStyle: PropTypes.object,
  date: PropTypes.string,
}

export default MainGrid
