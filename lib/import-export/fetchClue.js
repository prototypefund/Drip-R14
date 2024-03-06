/* eslint-disable no-useless-catch */
import {
  authenticate,
  fetchData,
  combineIntoDate,
  parseToDrip,
  transformToCsv,
} from './importclue'
import importCsv from './import-from-csv'
// throws different errors
async function importClue(email, password) {
  try {
    const token = await authenticate(email, password)
    //console.log('Authentication successful. Token:', token);

    const userData = await fetchData()
    //console.log('User data retrieved with length', userData);

    const dates = await combineIntoDate(JSON.parse(userData))
    //console.log("", dates)

    const dripData = await parseToDrip(JSON.parse(dates))

    const csv = await transformToCsv(dripData)
    //console.log(csv)

    await importCsv(csv, false)
  } catch (error) {
    throw error
  }
}

async function importClueOffline(userData) {
  try {
    const dates = await combineIntoDate(JSON.parse(userData))
    //console.log("", dates)
    const dripData = await parseToDrip(JSON.parse(dates))

    const csv = await transformToCsv(dripData)
    //console.log(csv)

    await importCsv(csv, false)
  } catch (error) {
    throw error
  }
}

export { importClue, importClueOffline }
