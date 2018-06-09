import * as joda from 'js-joda'

const LocalDate = joda.LocalDate

export default function config(bleedingDaysSortedByDateView, opts) {
  opts = opts || {
    maxBreakInBleeding: 1
  }

  return function getCycleDayNumber(targetDateString) {
    const targetDate = LocalDate.parse(targetDateString)
    const withWrappedDates = bleedingDaysSortedByDateView
      .filter(day => !day.bleeding.exclude)
      .map(day => {
        day.wrappedDate = LocalDate.parse(day.date)
        return day
      })

    const firstBleedingDayBeforeTargetDayIndex = withWrappedDates.findIndex(day => day.wrappedDate.isBefore(targetDate))
    if (firstBleedingDayBeforeTargetDayIndex < 0) return null
    const previousBleedingDays = withWrappedDates.slice(firstBleedingDayBeforeTargetDayIndex)

    const lastPeriodStart = previousBleedingDays.find((day, i) => {
      return thereIsNoPreviousBleedingDayWithinTheThreshold(day, previousBleedingDays.slice(i + 1), opts.maxBreakInBleeding)
    })

    const diffInDays = lastPeriodStart.wrappedDate.until(targetDate, joda.ChronoUnit.DAYS)

    // cycle starts at day 1
    return diffInDays + 1
  }
}

function thereIsNoPreviousBleedingDayWithinTheThreshold(bleedingDay, earlierCycleDays, allowedBleedingBreak) {
  const periodThreshold = bleedingDay.wrappedDate.minusDays(allowedBleedingBreak + 1)
  return !earlierCycleDays.some(({ wrappedDate }) => wrappedDate.equals(periodThreshold) || wrappedDate.isAfter(periodThreshold))
}