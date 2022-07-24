const { DateTime } = require('luxon')
const { formatWithOrdinalSuffix } = require('../components/helpers/format-date')

describe('Date', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have same date when navigating between cycle day and symptom view', async () => {
    await element(by.text('add data for today')).tap()
    await expect(
      element(by.id('headerTitle').and(by.text('today')))
    ).toBeVisible()
    await element(by.id('backButton')).tap()
    await element(by.id('drip-icon-bleeding')).tap()

    const today = DateTime.now()
    const yesterday = today.minus({ day: 1 })
    const yesterdayFormatted =
      yesterday.toFormat('MMMM ').toLowerCase() +
      formatWithOrdinalSuffix(yesterday.day) +
      yesterday.toFormat(' yyyy')

    await expect(
      element(by.id('headerSubtitle').and(by.text(yesterdayFormatted)))
    ).toBeVisible()
  })
})
