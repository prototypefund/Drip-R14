/* eslint-disable no-useless-catch */
import {
  authenticate,
  fetchData,
  combineIntoDate,
  parseToDrip,
  transformToCsv,
} from './importclue'
import importCsv from './import-from-csv'

/**
 * Handles all parts of importing from Clue API, fetching & importing.
 * @param email {string}
 * @param password {string}
 * @throws {Error}
 */
async function importClue(email, password) {
  try {
    const token = await authenticate(email, password)
    const userData = await fetchData(token)
    const dates = await combineIntoDate(userData)
    const dripData = await parseToDrip(dates)
    const csv = await transformToCsv(dripData)
    await importCsv(csv, false) //for now, importing Clue never deletes drip data
  } catch (error) {
    throw error
  }
}

/**
 * Imports user data read from file into drip database
 * @param userData {string}  clue user data in json format
 * @throws {Error}
 */
async function importClueOffline(userData) {
  try {
    userData = JSON.parse(userData) //parse from string
    const dates = await combineIntoDate(userData)
    const dripData = await parseToDrip(dates)
    const csv = await transformToCsv(dripData)
    await importCsv(csv, false) //for now, importing Clue never deletes drip data
  } catch (error) {
    throw error
  }
}

export { importClue, importClueOffline }
