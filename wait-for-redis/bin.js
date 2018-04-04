#!/usr/bin/env node

const waitForRedis = require('./index')

const { REDIS_URI, MAX_ATTEMPTS, DELAY } = process.env

const options = {
  connectionString: REDIS_URI,
  maxAttempts: +MAX_ATTEMPTS || 60,
  delay: +DELAY || 1000
}

async function main() {
  const isAvailable = await waitForRedis(options)
  if (!isAvailable) {
    console.error('[wait-for-redis] Redis server is not available')
    process.exitCode = 1
  }
}

main()
