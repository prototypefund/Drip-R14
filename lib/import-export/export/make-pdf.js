import colors from '../../../styles/colors'
import cycleModule from '../../cycle'
import { drop, fontJost } from './constants'
import { getCycleDay } from '../../../db'
import { mucusNFP } from '../../../i18n/en/cycle-day'

import { getBleedingStats, getCycleLengthStats } from '../../cycle-length'

let numbers
let statsData
const keyToNumber = {
  angry: 1,
  anxious: 2,
  balanced: 3,
  energetic: 4,
  fatigue: 5,
  fine: 6,
  happy: 7,
  sad: 8,
  stressed: 9,
}

/**
 * Generates HTML table rows for displaying basic info about last 12 cycles.
 *
 * This function constructs a string containing HTML markup for table rows. Each row represents
 * a set of statistics, including the date, cycle length, and bleeding length.
 *
 * @returns {string} A string containing HTML markup for table rows, each row representing a cycle.
 *
 * @example
 * // Assuming statsData is an array of statistics objects
 * const tableHTML = fillTable();
 * document.getElementById('myTable').innerHTML = tableHTML;
 */
function fillTable() {
  let tableHTML = ''
  numbers = Math.min(statsData.length, 12)
  for (let cycle = 0; cycle < numbers; cycle++) {
    const val = statsData[cycle]
    tableHTML += `<tr> <td>${val.date}</td> <td>${val.cycleLength}</td> <td>${val.bleedingLength}</td> </tr>`
  }
  return tableHTML
}

function generateOverview(t) {
  statsData = cycleModule().getStats()
  let isValid = false
  let cycleLengths = []
  let lengthStats = {}
  let bleedingStats = {}
  if (statsData.length >= 3) {
    isValid = true
    cycleLengths = cycleModule().getAllCycleLengths()
    lengthStats = getCycleLengthStats(cycleLengths)
    bleedingStats = getBleedingStats(statsData)
  }
  const tableContent = fillTable()

  const style = `
    <html lang="en">
<head>
<style>
  @font-face { font-family: 'Jost'; src: url(${fontJost}); font-weight: normal; font-style: normal; }
  @media print { * { -webkit-print-color-adjust: exact !important; } }
  body {
    font-family: 'Jost', serif; /* Fallback to sans-serif if Jost isn't available */
    font-weight: normal; 
    margin: 20px;
    padding: 0;
    background-color: #fff;
    color: #333;
  }
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }
  .header h1 {
    color: ${colors.purple};
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px; /* Adjust space between text and logo as needed */
  }
  .logo-image {
    width: 50px; /* Adjust based on your logo's size */
    height: 50px; /* Adjust based on your logo's size */
    border-radius: 50%; /* Optional: if you want a rounded logo */
  }  
  .handwriting-field {
    display: flex; /* Use flexbox layout */
  justify-content: space-between; /* Space out child elements */
  align-items: center; /* Align items vertically */
    border-bottom: 2px solid #333;
    padding: 10px 0;
    margin-bottom: 20px;
  }
  .statistics {
    color: #333;
    margin-bottom: 20px;
  }
  .stat-header {
    color: ${colors.purple};
    margin-bottom: 10px;
  }
  .stat-content {
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  .highlight {
    padding: 5px;
    border-radius: 5px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    padding: 8px;
    text-align: left;
}
th {
    font-weight: bold;
    border-bottom: 2px solid black; /* Bold line under header */
}
tr:not(:first-child) td {
    border-top: 1px solid black; /* Regular lines between rows */
}
.content-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.information-field {
  margin-left: 20px; /* Space between statistics and this field */
  margin-right: 20px; /* Space between statistics and this field */

}

.information-field p {
  margin: 5px 0; /* Adjust spacing between lines */
  padding: 0;
}


</style><title>drip. export</title>
</head>`
  const structure = `
    <body>
    <div class="header">
    <h1>drip.</h1>
     <img class="logo-image" src=${drop} alt="drip. logo showing a drop">
  </div>
<div class="handwriting-field">
<span>${t('export.overview.name') + ': '}</span>
  <span>${t('export.overview.dob') + ': '}</span>:
</div>
 <div class="content-container">
<div class="statistics">\
  <h2 class="stat-header">${t('export.overview.statistics.title') + ': '}</h2>\
  <div class="stat-content">${
    t('export.overview.statistics.count') + ': '
  } <span class="highlight">${cycleLengths.length + 1}</span></div>\
  <div class="stat-content">${
    t('export.overview.statistics.cycleLength') + ': '
  } <span class="highlight">${isValid ? lengthStats.mean : '-'}</span></div>\
  <div class="stat-content">${
    t('export.overview.statistics.bleedingLength', { count: numbers }) + ': '
  } <span class="highlight">${isValid ? bleedingStats : '-'}</span></div>\
</div>

  <div class="information-field">
    <h2 class="stat-header">${t('export.overview.notes') + ': '}</h2>\
    <p> ________________________________________________________________</p>
    <p> ________________________________________________________________</p>
    <p> ________________________________________________________________</p>
    <p> ________________________________________________________________</p>
    <p> ________________________________________________________________</p>
    <p> ________________________________________________________________</p>
    <p> ________________________________________________________________</p>

  </div>
</div>
<h2 class="stat-header">${t('export.overview.statistics.lastCycles', {
    count: numbers,
  })}</h2>\
<table>
    <thead>
        <tr>
            <th>${t('stats.details.cycleStart')}</th>
            <th>${t('stats.details.cycleLength')}</th>
            <th>${t('stats.details.bleedingLength')}</th>
        </tr>
    </thead>
    <tbody>
    ${tableContent}
    </tbody>
</table>
${generateChartPage(t)}
</body>
</html>`
  return style + structure
}

/**
 * There is one overarching svg element that each function called here appends to.
 * Note: length & current are only used to display page numbers at the top
 * @param t - i18n translation
 * @param data - array of cycleday objects
 * @param dates - array of dates corresponding to the data in "data"
 * @param length - int: total number of cycles
 * @param current - int: current cycle
 * @returns {string} - svg string containing the entire chart
 */
function generateChart(t, data, dates, length, current) {
  //TODO: Adjust global font size based on number of entries
  //TODO: Too many entries? Split into multiple pages
  //TODO: Copy axis to other side as well
  // TODO: Customize categories
  // TODO: Overlay slight grey background stripes for graph
  // TODO: Legend should include other categories as well
  // Define A4 size in pixels
  const HEIGHT_A4 = 3508
  const WIDTH_A4 = 2480

  const FONT_FAMILY = 'Jost'
  const textColor = 'black'
  const numColumns = data.length
  const numRows = 10 // Including the taller temperature row
  const labelColumnWidth = 200 // Width of the left-hand label column
  const headerHeight = 500
  const cellWidth = Math.min((HEIGHT_A4 - labelColumnWidth) / numColumns, 500)
  const cellHeight = Math.min((WIDTH_A4 - headerHeight) / (numRows + 2), 500) // Extra space for the taller row
  const tallRowHeight = 3 * cellHeight

  const maxLineHeight = tallRowHeight - 100
  const temperaturesOrNull = data.map((o) =>
    o?.temperature !== undefined ? o.temperature : null
  )
  const tempFiltered = temperaturesOrNull
    .filter((o) => o != null)
    .map((o) => o.value)
  const maxTemperature = Math.max(...tempFiltered)
  const minTemperature = Math.min(...tempFiltered)
  const temperatureRange = maxTemperature - minTemperature

  const thirdRowY = 2 * cellHeight + headerHeight // This is where the third row starts
  const numScaleIntervals = 5 // Defines number of intervals on the scale
  const scaleStepSize = temperatureRange / numScaleIntervals // The temperature difference between scale lines

  let svgContent = `<svg viewBox="0 0 ${WIDTH_A4} ${HEIGHT_A4}"><defs>
    <style type="text/css">
      <![CDATA[
        @font-face {
          font-family: 'Jost';
          src: url(${fontJost})
        }
      ]]>
    </style>
  </defs>
  <g transform="rotate(90) translate(0, -${WIDTH_A4 + 60})">` // This rotates everything nicely so we can still use landscape mode while defining things but it printed in portrait mode
  /**
   * Creates drip. logo & text in upper corner and title
   * @param months - string of months depicted in this chart. Format "Jan/Feb 24"
   */
  function generateHeader(months) {
    svgContent += `<image x="50" y="80" width="100" height="100" href=${drop} /> <text x="160" y="150" text-anchor="start" font-family=${FONT_FAMILY} font-size="50" fill=${
      colors.purple
    }>${t('export.overview.drip')}</text>`
    svgContent += `<text x="${HEIGHT_A4 / 2}" y="${
      headerHeight / 2
    }" text-anchor="middle" font-family=${FONT_FAMILY} font-size="50" fill=${
      colors.purple
    }> ${t('export.chart.title', { months: months })} </text>`
  }

  /**
   * Creates the labels used on the left-hand side of the chart, but not the scale.
   * The labels are generated dynamically by the i18n translation.
   */
  function generateLabels() {
    const labels = [
      'Cycle Day',
      'Date',
      '',
      'bleeding',
      'cervix',
      'mucus',
      'sex',
      'pain',
      'mood',
      'desire',
    ]
    const xPosition = 50
    const fontSize = 28
    const smallFontSize = 20
    const xPositionForPain = 195

    for (let row = 0; row < numRows; row++) {
      let yPosition = row * cellHeight + cellHeight / 2 + headerHeight // Center label in the cell
      if (row === 2) continue
      if (row > 2) yPosition += tallRowHeight - cellHeight // Adjust for the taller third row
      let text = ''
      if (row === 0) {
        text = t('cycles.general.cycleDayNumber')
      } else if (row === 1) {
        text = t('label.shared.date')
      } else if (row === 5) {
        //"Cervical Mucus" is too long - just mucus instead?
        text = t('export.chart.mucusShort')
      } else {
        text = t('cycleDay.symptomBox.' + labels[row])
      }
      svgContent += `<text x="${xPosition}" y="${yPosition}" fill="${textColor}" font-size="${fontSize}" text-anchor="start" font-family="${FONT_FAMILY}">${capitalizeFirstLetter(
        text
      )}</text>`

      if (row === 7) {
        const painLabels = [
          t('cycles.pain.categories.headache'),
          t('cycles.pain.categories.cramps'),
          t('cycles.pain.categories.other'),
        ]
        painLabels.forEach((label, index) => {
          svgContent += `<text x="${xPositionForPain}" y="${
            yPosition + (cellHeight / 4) * (index - 1)
          }" fill="${textColor}" font-size="${smallFontSize}" text-anchor="end" font-family="${FONT_FAMILY}">${label.toUpperCase()}</text>`
        })
      }
    }

    const legend = manualObjectEntries(keyToNumber)
      .map(([key, value]) => `${value}: ${capitalizeFirstLetter(key)}`)
      .join(', ')
    svgContent += `<text x="${xPosition}" y="2530" fill="${textColor}" font-size="${smallFontSize}" text-anchor="start" font-family="${FONT_FAMILY}">${
      t('export.chart.legend') +
      ': ' +
      capitalizeFirstLetter(t('cycleDay.symptomBox.mood')) +
      ' - ' +
      legend
    }</text>`
  }

  generateLabels()

  /**
   * Create the table cells used to track symptoms.
   * These are simply boxes with black outlines whose height / width is predefined by the number of entries.
   * The temperature row is omitted as there shouldn't be any vertical lines between the data points.
   */
  function generateTableCells() {
    for (let row = 0; row < numRows; row++) {
      let y = row * cellHeight + headerHeight
      const isTallRow = row === 2
      if (row >= 2) y += tallRowHeight - cellHeight // Adjust for the taller third row
      const height = isTallRow ? tallRowHeight : cellHeight
      for (let col = 0; col < numColumns; col++) {
        const x = col * cellWidth + labelColumnWidth
        if (!isTallRow) {
          svgContent += `<rect x="${x}" y="${y}" width="${cellWidth}" height="${height}" style="fill:none;stroke:black;stroke-width:1" />`
        }
      }
    }
  }

  generateTableCells()

  const months = []
  let year = 0

  /**
   * Main method used to fill the table cell with the actual tracked data.
   */
  function fillTableCells() {
    const createTextElement = (x, y, text, fontSize = '28', yOffset = 0) => {
      return `<text x="${x}" y="${
        y + yOffset
      }" fill="black" font-size="${fontSize}" text-anchor="middle" font-family="${FONT_FAMILY}">${text}</text>`
    }

    const processRowData = (col, x, y, data, processFunc) => {
      if (data) {
        svgContent += processFunc(x + cellWidth / 2, y + cellHeight / 2, data)
      }
    }

    const generateCircle = (
      x,
      y,
      radius,
      strokeColor = colors.purple,
      strokeWidth = '2px'
    ) => {
      svgContent += `<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke-width="${strokeWidth}" stroke="${strokeColor}"></circle>`
    }

    // If the user didn't enter this symptom on a particular day, it is undefined. Null can be handled much better.
    const bleedingData = data.map((o) =>
      o?.bleeding !== undefined ? o.bleeding : null
    )
    const cervixData = data.map((o) =>
      o?.cervix !== undefined ? o.cervix : null
    )
    const mucusData = data.map((o) => (o?.mucus !== undefined ? o.mucus : null))
    const sexData = data.map((o) => (o?.sex !== undefined ? o.sex : null))
    const painData = data.map((o) => (o?.pain !== undefined ? o.pain : null))
    const moodData = data.map((o) => (o?.mood !== undefined ? o.mood : null))
    const desireData = data.map((o) =>
      o?.desire !== undefined ? o.desire : null
    )
    let month = -1

    // Iterate over all rows / columns.
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        const x = col * cellWidth + labelColumnWidth
        const xCenter = x + cellWidth / 2
        let y = row * cellHeight + headerHeight
        if (row >= 2) y += tallRowHeight - cellHeight

        switch (row) {
          case 0: // Cycle day number
            svgContent += createTextElement(
              x + cellWidth / 2,
              y + cellHeight / 2,
              col + 1
            )
            break
          case 1: // Date of month (& potentially month for 1st)
            // eslint-disable-next-line no-case-declarations
            const date = new Date(dates[col])
            //1st of month & 1st day should get month as subscript
            if (date.getMonth() !== month) {
              month = date.getMonth()
              const monthLoc = date.toLocaleString('default', {
                month: 'short',
              })
              months.push(monthLoc)
              year = ('' + date.getFullYear()).slice(2, 4)
              svgContent += createTextElement(
                x + cellWidth / 2,
                y + cellHeight / 2 + 30,
                monthLoc
              )
            }
            svgContent += createTextElement(
              x + cellWidth / 2,
              y + cellHeight / 2,
              date.getDate()
            )
            break
          case 2: // Temperature
            // Handled separately in generateLineGraph()
            break
          case 3: // Bleeding
            if (bleedingData[col]) {
              processRowData(col, x, y, bleedingData[col], (x, y, value) =>
                createTextElement(x, y, value.value + 1)
              )
            }
            break
          case 4: // Cervix
            if (cervixData[col]) {
              const radius = 3 + (cervixData[col].opening || 0) * 8
              const yPosAdjustment = -(cervixData[col].position || 0) * 30
              generateCircle(
                xCenter,
                y + cellHeight / 2 + 50 + yPosAdjustment,
                radius
              )
              if (cervixData[col].firmness) {
                createTextElement(
                  xCenter,
                  y + cellHeight / 4,
                  cervixData[col].firmness
                )
              }
            }
            break
          case 5: // Cervical mucus
            if (mucusData[col]) {
              processRowData(col, x, y, mucusData[col].value, (x, y, value) =>
                createTextElement(x, y, mucusNFP[value])
              )
            }
            break
          case 6: // Sex
            //TODO: Better calculation if protected or not
            if (sexData[col]) {
              const text = sexData[col].none ? 'NP' : 'P'
              processRowData(col, x, y, sexData[col].partner, (x, y, value) =>
                createTextElement(x, y, value ? text : 'S')
              )
            }
            break
          case 7: // Pain
            // eslint-disable-next-line no-case-declarations
            const painTypes = ['migraine/headache', 'cramps', 'other']
            painTypes.forEach((type, index) => {
              if (
                painData[col] &&
                type === 'migraine/headache' &&
                (painData[col]['migraine'] || painData[col]['headache'])
              ) {
                svgContent += createTextElement(
                  xCenter,
                  y +
                    ((index - 1) * cellHeight) / 4 +
                    (index - 2) * 10 +
                    cellHeight / 2,
                  'x',
                  '28'
                )
              } else if (painData[col] && painData[col][type]) {
                svgContent += createTextElement(
                  xCenter,
                  y +
                    ((index - 1) * cellHeight) / 4 +
                    (index - 2) * 10 +
                    cellHeight / 2,
                  'x',
                  '28'
                )
              }
            })
            break
          case 8: //Mood
            //This tries to distribute up to 9 entries evenly across the cell
            if (moodData[col]) {
              const moods = manualObjectEntries(moodData[col])
                .filter(([, value]) => value)
                .map(([key]) => keyToNumber[key])
                .sort((a, b) => a - b)
              const splitResults = []
              for (let i = 0; i < moods.length; i += 3) {
                splitResults.push(moods.slice(i, i + 3))
              }
              splitResults.forEach((split, index, array) => {
                const totalSplits = array.length
                const yPos = y + ((index + 1) * cellHeight) / (totalSplits + 1)
                svgContent += createTextElement(xCenter, yPos, split.join(', '))
              })
            }
            break
          case 9: //Desire
            if (desireData[col]) {
              processRowData(col, x, y, desireData[col].value, (x, y, value) =>
                createTextElement(x, y, value)
              )
            }
            break
          default:
            break
        }
      }
    }
  }

  fillTableCells()

  // Page numbers
  svgContent += `<text x="${
    HEIGHT_A4 - 200
  }" y="${200}" font-size="40" text-anchor="middle">  ${
    current + 1 + '/' + length
  } </text>`
  generateHeader(months.join('/') + ' ' + year)

  /**
   * Generates scale on the left-hand side of the graph.
   */
  function generateAxis() {
    let scaleLinesAndLabels = ''
    const xOffset = cellWidth / 4 + 80
    const yOffset = 5
    const fontSize = 28
    for (let i = 0; i <= numScaleIntervals; i++) {
      const scaleValue = minTemperature + i * scaleStepSize
      const yScaleLine =
        thirdRowY + 50 + maxLineHeight - (i / numScaleIntervals) * maxLineHeight

      scaleLinesAndLabels += `<text x="${xOffset}" y="${
        yScaleLine + yOffset
      }" fill="black" font-size="${fontSize}" text-anchor="middle" font-family="${FONT_FAMILY}">${scaleValue.toFixed(
        1
      )}</text>`
    }
    svgContent += scaleLinesAndLabels
  }
  /**
   * Generates the line graph used to represent basal temperature readings.
   * If no temperatures have been tracked, replaces it with text "No temp. tracked".
   */
  function generateLineGraph() {
    let polylinePoints = '' // Initialize an empty string for the polyline points
    const polylines = []
    const yOffset = 2 * cellHeight

    temperaturesOrNull.forEach((temp, col) => {
      const x = col * cellWidth + cellWidth / 2 + labelColumnWidth
      let tempY
      if (temp) {
        const normalizedTemp = temp.value - minTemperature
        tempY = calculateTemperatureYPosition(normalizedTemp) + yOffset
        polylinePoints += `${x},${tempY} `
        svgContent += `<circle cx="${x}" cy="${tempY}" r="3" fill="${colors.purple}" />`
      } else if (polylinePoints) {
        polylines.push(polylinePoints.trim())
        polylinePoints = ' '
      }
    })

    finalizePolylinePoints(polylinePoints, polylines, yOffset)
  }

  /**
   *  Calculates position of data point on graph.
   *  If all values are the same, center them in the middle of the graph.
   * @param normalizedTemp temperature difference from min temp
   * @returns {number} yPosition of the temperature
   */
  function calculateTemperatureYPosition(normalizedTemp) {
    if (temperatureRange === 0) {
      return headerHeight + tallRowHeight / 2
    }
    return (
      tallRowHeight -
      (normalizedTemp / temperatureRange) * (tallRowHeight - 100) +
      headerHeight -
      50
    )
  }

  /**
   * Generates the lines between the temperature data points.
   * If the temperatures are discontinuous, polylines has multiple entries.
   * @param polylinePoints - string of points using format "a,b x,y"
   * @param polylines - array of polylinePoints
   * @param yOffset - start of the third row
   */
  function finalizePolylinePoints(polylinePoints, polylines, yOffset) {
    if (polylinePoints) {
      polylines.push(polylinePoints.trim())
    }
    if (polylinePoints.length === 0) {
      svgContent += `<text x="${HEIGHT_A4 / 2}" y="${
        yOffset + headerHeight + tallRowHeight / 2
      }" text-anchor="middle" font-family="${FONT_FAMILY}" font-size="40" fill="${
        colors.purple
      }">${t('export.chart.noTemps')}</text>`
    } else {
      polylines.forEach((points) => {
        svgContent += `<polyline points="${points}" style="fill:none; stroke:${colors.purple};stroke-width:2" />`
      })
      // only generate scale if data points exist
      generateAxis()
    }
  }

  generateLineGraph()

  return svgContent + '</g> </svg>'
}

/**
 * Responsible for dispatching and merging all the chart pages created by generateChart()
 * Manually iterating over the length of each cycle & passes cycleDay array, array of dates, overall length & current index.
 *  @param t  i18n translation
 *  @returns {entries} string comprised of n svg elements, each depicting one cycle
 */

function generateChartPage(t) {
  const stats = cycleModule().getStats()
  let pdfContent = ''
  stats.forEach((cycle, index) => {
    const cycleDate = new Date(cycle.date)
    const cycleLength = cycle.cycleLength || 99

    const dates = []
    const data = []

    for (let day = 0; day < cycleLength; day++) {
      const dateString = cycleDate.toISOString().slice(0, 10)

      dates.push(dateString)
      data.push(getCycleDay(dateString))
      cycleDate.setDate(cycleDate.getDate() + 1)
    }
    pdfContent += generateChart(t, data, dates, stats.length, index)
  })
  return pdfContent
}
// For some reason, Object.entries() just wouldn't work, so I replicated this here
function manualObjectEntries(obj) {
  const entries = []
  for (const key in obj) {
    entries.push([key, obj[key]])
  }
  return entries
}

function capitalizeFirstLetter(s) {
  if (typeof s === 'string' || s instanceof String) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  return s
}

export { generateOverview, generateChartPage }
