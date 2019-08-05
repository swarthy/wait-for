const waitForRabbit = require('../../lib/rabbit')

describe('waitForRabbit', () => {
  it('should resolve true when connect to available server', async () => {
    const options = {
      connectionString: process.env.RABBITMQ_URI || 'amqp://localhost',
      maxAttempts: 2,
      delay: 200
    }
    await expect(waitForRabbit(options)).to.become(true)
  })
  it('should resolve false when connect to not available server', async () => {
    const options = {
      connectionString: 'amqp://localhost:9999',
      maxAttempts: 2,
      delay: 200
    }
    await expect(waitForRabbit(options)).to.become(false)
  })
})
