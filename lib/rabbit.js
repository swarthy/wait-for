const amqplib = require('amqplib')
const { consoleError } = require('./log')
const debug = require('debug')('wait-for:rabbit')

function delayPromise(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isUsualError(err) {
  return (
    err.code === 'ENOTFOUND' ||
    err.code === 'ECONNREFUSED' ||
    err.code === 'ECONNRESET' ||
    err.code === 'EAI_AGAIN'
  )
}

module.exports = async function waitForRabbit(options) {
  const { connectionString, delay, maxAttempts, quiet } = options

  debug('URI:', connectionString)
  debug('Max attempts:', maxAttempts)
  debug('Delay between attempts (ms):', delay)

  let attempt = 0

  while (attempt++ < maxAttempts) {
    debug('Attempt #%d', attempt)
    try {
      const connection = await amqplib.connect(connectionString)
      debug('Rabbit available!')
      await connection.close()
      return true
    } catch (err) {
      if (!isUsualError(err)) {
        consoleError(quiet, '[wait-for-rabbit] error:', err.message)
      }
      debug('error:', err)
      await delayPromise(delay)
    }
  }
  debug('Attempt limit exceeded')
  return false
}
