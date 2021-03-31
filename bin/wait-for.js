#!/usr/bin/env node

const { program } = require('commander')
const waitForPostgres = require('../lib/postgres')
const waitForRabbit = require('../lib/rabbit')
const waitForRedis = require('../lib/redis')
const { consoleError } = require('../lib/log')
const pkg = require('../package.json')

program
  .option(
    '--postgresql [URI]',
    'Wait for PostgreSQL server become available (success SQL query) (env: POSTGRESQL_URI)'
  )
  .option(
    '--rabbitmq [URI]',
    'Wait for RabbitMQ server become available (accepted connection) (env: RABBITMQ_URI)'
  )
  .option(
    '--redis [URI]',
    'Wait for Redis server become available (accepted connection) (env: REDIS_URI)'
  )
  .option('-d, --delay [ms]', 'Delay between attempts')
  .option('-c, --max-attempts [count]', 'Max attempts')
  .option('-q, --quiet', 'Quiet mode')
  .version(pkg.version)
  .parse(process.argv)

const options = program.opts()

const { postgresql, rabbitmq, redis, quiet } = options

const delay = +options.delay || 1000
const maxAttempts = +options.maxAttempts || 60

if (!postgresql && !rabbitmq && !redis) {
  program.outputHelp()
  process.exit(1)
}

const assert = (condition, quiet, msg) => {
  if (!condition) {
    consoleError(quiet, '[wait-for]', msg)
    process.exit(1)
  }
}

assert(delay > 0, quiet, 'delay must be greater than 0')
assert(maxAttempts > 0, quiet, 'maxAttempts must be greater than 0')

const getURI = (arg, defaultValue) =>
  typeof arg === 'string' ? arg : arg === true ? defaultValue : null

if (postgresql) {
  const connectionString = getURI(postgresql, process.env.POSTGRESQL_URI)
  assert(connectionString, 'URI for PostgresSQL not specified')
  const options = { connectionString, maxAttempts, delay, quiet }
  waitForPostgres(options).then(isAvailable =>
    assert(isAvailable, 'PostgreSQL server is not available')
  )
}

if (rabbitmq) {
  const connectionString = getURI(rabbitmq, process.env.RABBITMQ_URI)
  assert(connectionString, 'URI for RabbitMQ not specified')
  const options = { connectionString, maxAttempts, delay, quiet }
  waitForRabbit(options).then(isAvailable =>
    assert(isAvailable, 'RabbitMQ server is not available')
  )
}

if (redis) {
  const connectionString = getURI(redis, process.env.REDIS_URI)
  assert(connectionString, 'URI for Redis not specified')
  const options = { connectionString, maxAttempts, delay, quiet }
  waitForRedis(options).then(isAvailable =>
    assert(isAvailable, 'Redis server is not available')
  )
}
