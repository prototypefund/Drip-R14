import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { LocalDate } from '@js-joda/core'

export const DateContext = createContext()

const DateProvider = (props) => {
  const [date, setDate] = useState(LocalDate.now().toString())

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {props.children}
    </DateContext.Provider>
  )
}

export default DateProvider

export const useDate = () => useContext(DateContext)

DateProvider.propTypes = {
  children: PropTypes.node,
}
