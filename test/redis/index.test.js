/* global expect */

const waitForRedis = require('../../lib/redis')

describe('waitForRedis', () => {
  it('should resolve true when connect to available server', async () => {
    const options = {
      connectionString: process.env.REDIS_URI || 'redis://localhost',
      maxAttempts: 2,
      delay: 200
    }
    await expect(waitForRedis(options)).to.become(true)
  })
  it('should resolve false when connect to not available server', async () => {
    const options = {
      connectionString: 'redis://localhost:9999',
      maxAttempts: 2,
      delay: 200
    }
    await expect(waitForRedis(options)).to.become(false)
  })
})
