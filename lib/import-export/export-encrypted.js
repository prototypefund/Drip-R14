import Crypto from 'react-native-quick-crypto'

async function deriveKey(password, salt) {
  // Define the key length
  const keyLength = 32 // for AES-256

  // Specify the number of iterations, higher is better but slower
  const iterations = 100000

  // The hash function to use
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

async function encryptData(text, password) {
  const salt = Crypto.randomBytes(16).toString('hex') // Generates a random salt
  const key = await deriveKey(password, salt)
  const iv = Crypto.randomBytes(16) // Generate a random IV
  const cipher = Crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const output = iv.toString('hex') + salt + encrypted
  return output

  console.log(await decryptData(output, password))
}

async function decryptData(encryptedWithIvAndSalt, password) {
  // Extract the IV, salt, and encrypted data
  const iv = Buffer.from(encryptedWithIvAndSalt.substring(0, 32), 'hex') // First 16 bytes (32 hex characters)
  const salt = encryptedWithIvAndSalt.substring(32, 64) // Next 16 bytes (32 hex characters) for the salt
  const encryptedData = encryptedWithIvAndSalt.substring(64) // The rest is the encrypted data

  // Derive the key using the same password and salt
  const key = await deriveKey(password, salt)
  // Create a decipher
  const decipher = Crypto.createDecipheriv('aes-256-cbc', key, iv)
  // Decrypt the data
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

export { encryptData, decryptData }
