class NetworkError extends Error {
  constructor(message) {
    super(message) // Call the parent constructor with the message
    this.name = 'NetworkError' // Custom name for the error type
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message) // Call the parent constructor with the message
    this.name = 'AuthenticationError' // Custom name for the error type
  }
}

class ParsingError extends Error {
  constructor(message) {
    super(message) // Call the parent constructor with the message
    this.name = 'ParsingError' // Custom name for the error type
  }
}

export { NetworkError, AuthenticationError, ParsingError }
