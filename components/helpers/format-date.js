import { DateTime } from 'luxon'

import { general as labels } from '../../i18n/en/cycle-day'

export function formatDateForShortText(date) {
  const d = DateTime.fromFormat(date.toString(), 'yyyy-MM-dd')
  return d.toFormat('EEEE, MMMM ') + formatWithOrdinalSuffix(d.day)
}

export function dateToTitle(dateString) {
  const today = DateTime.now()
  const dateToDisplay = DateTime.fromFormat(dateString, 'yyyy-MM-dd')
  return today.hasSame(dateToDisplay, 'day')
    ? labels.today
    : dateToDisplay.toFormat('EEE dd. MMM yy')
}

const pr = new Intl.PluralRules('en-US', { type: 'ordinal' })
const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
])

export function getOrdinalSuffix(n) {
  const rule = pr.select(n)
  const suffix = suffixes.get(rule)
  return suffix
}

export function formatWithOrdinalSuffix(n) {
  const suffix = getOrdinalSuffix(n)
  return `${n}${suffix}`
}
