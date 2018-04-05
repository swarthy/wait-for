const redis = require('redis')
const Bluebird = require('bluebird')
Bluebird.promisifyAll(redis.RedisClient.prototype)
Bluebird.promisifyAll(redis.Multi.prototype)

const debug = require('debug')('wait-for-redis')

function isUsualError(err) {
  return (
    err.code === 'ENOTFOUND' ||
    err.code === 'ECONNREFUSED' ||
    err.code === 'EAI_AGAIN'
  )
}

module.exports = async function waitForRedis(options) {
  const { connectionString, delay, maxAttempts } = options

  debug('URI:', connectionString)
  debug('Max attempts:', maxAttempts)
  debug('Delay between attempts (ms):', delay)

  return new Promise(resolve => {
    const client = redis.createClient({
      url: connectionString,
      retry_strategy: function(opts) {
        debug('Attempt #%d', opts.attempt)
        if (opts.attempt > maxAttempts) {
          debug('Attempt limit exceeded')
          client.quit()
          resolve(false)
          return undefined
        }
        if (opts.error) {
          if (!isUsualError(opts.error)) {
            console.error('[wait-for-redis] error:', opts.error.message)
          }
          debug('error:', opts.error)
          return delay
        }
        return delay
      }
    })
    client.on('ready', () => {
      debug('Redis server is ready!')
      client.quit()
      resolve(true)
    })
    client.on('error', err => {
      debug('client error', err)
    })
  })
}
