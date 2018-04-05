#!/usr/bin/env node

const waitForPostgres = require('../lib/postgres')

const { POSTGRESQL_URI, MAX_ATTEMPTS, DELAY } = process.env

const options = {
  connectionString: POSTGRESQL_URI || 'postgres://postgres@localhost',
  maxAttempts: +MAX_ATTEMPTS || 60,
  delay: +DELAY || 1000
}

async function main() {
  const isAvailable = await waitForPostgres(options)
  if (!isAvailable) {
    console.error('[wait-for-postgres] PostgreSQL server is not available')
    process.exitCode = 1
  }
}

main()
