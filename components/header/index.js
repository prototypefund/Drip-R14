import React from 'react'
import { Dimensions } from 'react-native'

import BackButtonHeader from './back-button'
import CycleDayHeader from './cycle-day'
import DefaultHeader from './default'
import SymptomViewHeader from './symptom-view'

export default function Header(p) {
  const middle = Dimensions.get('window').width / 2
  const props = Object.assign({}, p, { middle })

  if (props.isCycleDayOverView) {
    return <CycleDayHeader {...props} />
  } else if (props.isSymptomView) {
    return <SymptomViewHeader {...props} />
  } else if (props.showBackButton) {
    return <BackButtonHeader {...props} />
  } else {
    return <DefaultHeader {...props} />
  }
}
