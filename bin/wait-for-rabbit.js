#!/usr/bin/env node

const waitForRabbit = require('../lib/rabbit')

const { RABBITMQ_URI, MAX_ATTEMPTS, DELAY } = process.env

const options = {
  connectionString: RABBITMQ_URI || 'amqp://localhost',
  maxAttempts: +MAX_ATTEMPTS || 60,
  delay: +DELAY || 1000
}

async function main() {
  const isAvailable = await waitForRabbit(options)
  if (!isAvailable) {
    console.error('[wait-for-rabbit] RabbitMQ server is not available')
    process.exitCode = 1
  }
}

main()
