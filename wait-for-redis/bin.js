#!/usr/bin/env node

const waitForRedis = require('./index')

const { REDIS_URI, MAX_ATTEMPTS } = process.env

const options = {
  connectionString: REDIS_URI,
  maxAttempts: +MAX_ATTEMPTS || 60
}

async function main() {
  const isPostgresAvailable = await waitForRedis(options)
  if (!isPostgresAvailable) {
    console.error('[wait-for-redis] Redis server is not available')
    process.exitCode = 1
  }
}

main()
