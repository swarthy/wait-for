# wait-for

[![npm](https://img.shields.io/npm/v/@swarthy/wait-for.svg)](https://www.npmjs.com/package/@swarthy/wait-for)
[![Build Status](https://travis-ci.org/swarthy/wait-for.svg?branch=master)](https://travis-ci.org/swarthy/wait-for)

_wait-for_ will try connect to server then exit with code `0` if server is available and `1` otherwise.

## Usage

### PostgreSQL

```bash
wait-for --postgresql postgres://postgres@localhost && npm run test-integration
# or
POSTGRESQL_URI=postgres://postgres@localhost wait-for --postgresql && npm run test-integration
```

### RabbitMQ

```bash
wait-for --rabbitmq amqp://localhost && npm run test-integration
# or
RABBITMQ_URI=amqp://localhost wait-for --rabbitmq && npm run test-integration
```

### Redis

```bash
wait-for --redis redis://localhost && npm run test-integration
# or
REDIS_URI=redis://localhost wait-for --redis && npm run test-integration
```

### Example

Wait for PostgreSQL, RabbitMQ and Redis (configured via environment)

```bash
wait-for --postgresql --rabbitmq --redis && npm run test-integration
```

## Configuration

| CLI argument       | Environment variable | Description            | Default |
| ------------------ | -------------------- | ---------------------- | ------- |
| --postgressql      | `POSTGRESQL_URI`     | Connection string      |         |
| --rabbitmq         | `RABBITMQ_URI`       | Connection string      |         |
| --redis            | `REDIS_URI`          | Connection string      |         |
| -c, --max-attempts |                      | Max attempt count      | 60      |
| -d, --delay        |                      | Delay between attempts | 1000    |

### Used packages

[amqplib](https://www.npmjs.com/package/amqplib)
[pg](https://www.npmjs.com/package/pg)
[redis](https://www.npmjs.com/package/redis)
