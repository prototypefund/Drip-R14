import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import Header from './components/header'
import Menu from './components/menu'
import Home from './components/home'
import Calendar from './components/calendar'
import CycleDay from './components/cycle-day/cycle-day-overview'
import symptomViews from './components/cycle-day/symptoms'
import Chart from './components/chart/chart'
import Settings from './components/settings'
import Stats from './components/stats'
import styles from './styles'
import {headerTitles as titles} from './components/labels'

// this is until react native fixes this bugg, see
// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const isSymptomView = name => Object.keys(symptomViews).indexOf(name) > -1

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'Home'
    }

    const handleBackButtonPress = function() {
      if (this.state.currentPage === 'Home') return false
      if (isSymptomView(this.state.currentPage)) {
        this.navigate('CycleDay', {cycleDay: this.state.currentProps.cycleDay})
      } else {
        this.navigate('Home')
      }
      return true
    }.bind(this)

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  navigate(pageName, props) {
    this.setState({currentPage: pageName, currentProps: props})
  }

  render() {
    const page = {
      Home, Calendar, CycleDay, Chart, Settings, Stats, ...symptomViews
    }[this.state.currentPage]
    return (
      <View style={{flex: 1}}>

        {this.state.currentPage != 'CycleDay' && <Header title={titles[this.state.currentPage]} />}

        {React.createElement(page, {
          navigate: this.navigate.bind(this),
          ...this.state.currentProps
        })}

        {!isSymptomView(this.state.currentPage) &&
          <Menu navigate={this.navigate.bind(this)} />
        }
      </View>
    )
  }
}