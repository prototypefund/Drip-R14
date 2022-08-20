import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { pages } from '../components/pages'

const NavigationContext = createContext()

const NavigationProvider = (props) => {
  const [currentPage, setCurrentPage] = useState('Home')

  const navigate = setCurrentPage

  const goBack = () => {
    const page = pages.find((p) => p.component === currentPage)
    setCurrentPage(page.parent)
  }

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, goBack }}>
      {props.children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider

export const useNavigation = () => useContext(NavigationContext)

NavigationProvider.propTypes = {
  children: PropTypes.node,
}
