import nodejs from 'nodejs-mobile-react-native'
import React, { Component } from 'react'
import { View } from 'react-native'

import { getLicenseFlag } from '../local-storage'
import App from './app'
import License from './license'
import PasswordPrompt from './password-prompt'

export default class AppWrapper extends Component {
  constructor() {
    super()
    this.state = {
      retrievingLicenseSetting: true
    }
    nodejs.start('main.js')
    this.checkLicenseAgreement()
  }

  async checkLicenseAgreement() {
    const agreed = await getLicenseFlag()
    this.setState({ retrievingLicenseSetting: false })
    if (!agreed) this.setState({ showLicense: true })
  }

  render() {
    const whiteScreen = <View style={{ flex: 1 }} />
    const licenseScreen = (
      <License
        setLicense={() => {
          this.setState({ showLicense: false })
        }}
      />
    )
    const passwordPrompt = (
      <PasswordPrompt
        showApp={() => {
          this.setState({ showApp: true })
        }}
      />
    )

    if (this.state.retrievingLicenseSetting) {
      return whiteScreen
    } else if (this.state.showLicense) {
      return licenseScreen
    } else if (!this.state.showApp) {
      return passwordPrompt
    } else {
      return <App />
    }
  }
}
