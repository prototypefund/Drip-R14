import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'

import LoadingMoreView from './loading-more'

const MainGrid = (props) => {
  const flatListRef = useRef()
  const [endReached, setEndReached] = useState(false)

  const jumpToDate = (date) => {
    let index = props.data.findIndex((item) => item == date)
    //TO-DO: Replace 7 with initial numtorender ?
    if (index !== -1) {
      index = Math.max(0, index - 7)
      flatListRef.current.scrollToIndex({ animated: false, index })
    }
  }

  useEffect(() => {
    if (props.targetDate) {
      jumpToDate(props.targetDate)
    }
    props.setTargetDate(null)
  }, [props.targetDate])

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
        }) //TO-DO: Replace with item width
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
}

export default MainGrid
