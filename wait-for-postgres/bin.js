#!/usr/bin/env node

const waitForPostgres = require('./index')

const { POSTGRESQL_URI } = process.env

const options = {
  connectionString: POSTGRESQL_URI
}

async function main() {
  const isPostgresAvailable = await waitForPostgres(options)
  if (!isPostgresAvailable) {
    console.error('[wait-for-postgres] PostgreSQL server is not available')
    process.exitCode = 1
  }
}

main()
