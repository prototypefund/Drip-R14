import Crypto from 'react-native-quick-crypto'

/**
 * Generates a key given a specific password & salt using a password-based key generation function
 * @param password {string} user's chosen password, length is largely irrelevant
 * @param salt {string} random! 16 byte string
 * @returns {string} cryptographically secure key
 * TODO: other keygen functions offer other parameters to protect against certain types of attacks (parallelism etc.), choose betterß
 */
async function deriveKey(password, salt) {
  const keyLength = 16 // for AES-128
  const iterations = 100000
  const digest = 'sha256'

  return new Promise((resolve, reject) => {
    Crypto.pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      digest,
      (err, derivedKey) => {
        if (err) reject(err)
        else resolve(derivedKey)
      }
    )
  })
}

/**
 * @summary Encrypts any type of string with any time of password.
 *
 *
 * @description The password is combined with a salt turned into a key.
 * This key & iv are then used to encrypt the data using aes-128-gcm.
 * The iv&salt do not have to be kept secret & should be new for each export,
 * therefore it is safe to prepend them to the encrypted output.
 * @param text {string} text to be encrypted
 * @param password {string} user's chosen password
 * @returns {string} aes128-gcm encrypted text, salt & iv prepended
 * TODO: AES-GCM needs to provide auth tag to mitigate possible padding oracle attack. FIND OUT HOW from this library!
 */
async function encryptData(text, password) {
  const salt = Crypto.randomBytes(16).toString('hex') // Generates a random salt
  const key = await deriveKey(password, salt)
  const iv = Crypto.randomBytes(12) // Generate a random IV

  const cipher = Crypto.createCipheriv('aes-128-gcm', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + salt + encrypted
}

/**
 * Extracts iv & salt from file and decrypts it. Otherwise very similar to {@link encryptData}
 * @param encryptedWithIvAndSalt
 * @param password
 * @returns {{result: Error}}
 */
async function decryptData(encryptedWithIvAndSalt, password) {
  // extract iv, salt, and encrypted data
  const iv = Buffer.from(encryptedWithIvAndSalt.substring(0, 24), 'hex') // First 12 bytes (24 hex characters)
  const salt = encryptedWithIvAndSalt.substring(24, 56) // Next 16 bytes (32 hex characters) for the salt
  const encryptedData = encryptedWithIvAndSalt.substring(56) // The rest is the encrypted data
  // derive key with same password & salt
  const key = await deriveKey(password, salt)
  const decipher = Crypto.createDecipheriv('aes-128-gcm', key, iv)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

export { encryptData, decryptData }
