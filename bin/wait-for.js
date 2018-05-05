#!/usr/bin/env node

const program = require('commander')
const waitForPostgres = require('../lib/postgres')
const waitForRabbit = require('../lib/rabbit')
const waitForRedis = require('../lib/redis')

const DEFAULT_DELAY = 1000
const DEFAULT_MAX_ATTEMPTS = 60

program
  .option('-d, --delay [ms]', 'Delay between attempts')
  .option('-c, --max-attempts [count]', 'Max attempts')
  .option(
    '--postgres [URI]',
    'Wait for PostgreSQL server become available (success SQL query) (env: POSTGRESQL_URI)'
  )
  .option(
    '--rabbit [URI]',
    'Wait for RabbitMQ server become available (accepted connection) (env: RABBITMQ_URI)'
  )
  .option(
    '--redis [URI]',
    'Wait for Redis server become available (accepted connection) (env: REDIS_URI)'
  )
  .parse(process.argv)

const delay = program.delay || process.env.DELAY || DEFAULT_DELAY
const maxAttempts =
  program.maxAttempts || process.env.MAX_ATTEMPTS || DEFAULT_MAX_ATTEMPTS

const die = msg => {
  console.error(msg)
  process.exit(1)
}
const pickArg = (arg, defaultValue) =>
  typeof arg === 'string' ? arg : arg === true ? defaultValue : null

if (program.postgres) {
  const connectionString = pickArg(program.postgres, process.env.POSTGRESQL_URI)
  if (!connectionString) {
    die('[wait-for] URI for PostgresSQL not specified')
  }

  const options = { connectionString, maxAttempts, delay }

  waitForPostgres(options).then(isAvailable => {
    if (!isAvailable) {
      die('[wait-for] PostgreSQL server is not available')
    }
  })
}

if (program.rabbit) {
  const connectionString = pickArg(program.rabbit, process.env.RABBITMQ_URI)
  if (!connectionString) {
    die('[wait-for] URI for RabbitMQ not specified')
  }

  const options = { connectionString, maxAttempts, delay }

  waitForRabbit(options).then(isAvailable => {
    if (!isAvailable) {
      die('[wait-for] RabbitMQ server is not available')
    }
  })
}

if (program.redis) {
  const connectionString = pickArg(program.redis, process.env.REDIS_URI)

  if (!connectionString) {
    die('[wait-for] URI for Redis not specified')
  }

  const options = { connectionString, maxAttempts, delay }

  waitForRedis(options).then(isAvailable => {
    if (!isAvailable) {
      die('[wait-for] Redis server is not available')
    }
  })
}
