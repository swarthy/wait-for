/* global expect */

const waitForPostgres = require('../../lib/postgres')

describe('waitForPostgres', () => {
  it('should resolve true when connect to available server', async () => {
    const options = {
      connectionString:
        process.env.POSTGRESQL_URI || 'postgres://postgres@localhost:5432',
      maxAttempts: 2,
      delay: 200
    }
    await expect(waitForPostgres(options)).to.become(true)
  })
  it('should resolve false when connect to not available server', async () => {
    const options = {
      connectionString: 'postgres://postgres@localhost:9999',
      maxAttempts: 2,
      delay: 200
    }
    await expect(waitForPostgres(options)).to.become(false)
  })
})
