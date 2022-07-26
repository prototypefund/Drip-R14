import { expect } from 'chai'
import { DateTime } from 'luxon'
import {
  formatDateForShortText,
  dateToTitle,
  formatWithOrdinalSuffix,
} from '../components/helpers/format-date'

describe('format-date', () => {
  it('formats formatDateForShortText', () => {
    expect(formatDateForShortText('2022-07-24')).to.eql('Sunday, July 24th')
  })

  it('formats dateToTitle', () => {
    expect(dateToTitle(DateTime.local().toFormat('yyyy-MM-dd'))).to.eql('Today')
    expect(dateToTitle('2021-07-24')).to.eql('Sat 24. Jul 21')
  })

  it('formats ordinal', () => {
    expect(formatWithOrdinalSuffix(1)).to.eql('1st')
    expect(formatWithOrdinalSuffix(2)).to.eql('2nd')
    expect(formatWithOrdinalSuffix(3)).to.eql('3rd')
    expect(formatWithOrdinalSuffix(4)).to.eql('4th')
    expect(formatWithOrdinalSuffix(5)).to.eql('5th')
    expect(formatWithOrdinalSuffix(10)).to.eql('10th')
    expect(formatWithOrdinalSuffix(20)).to.eql('20th')
    expect(formatWithOrdinalSuffix(21)).to.eql('21st')
    expect(formatWithOrdinalSuffix(22)).to.eql('22nd')
    expect(formatWithOrdinalSuffix(23)).to.eql('23rd')
    expect(formatWithOrdinalSuffix(24)).to.eql('24th')
    expect(formatWithOrdinalSuffix(28)).to.eql('28th')
  })
})
