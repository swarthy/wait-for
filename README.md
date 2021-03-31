# wait-for

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

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
| -q, --quiet        |                      | Quiet mode             |         |

### Used packages

[amqplib](https://www.npmjs.com/package/amqplib)
[pg](https://www.npmjs.com/package/pg)
[redis](https://www.npmjs.com/package/redis)

[npm-image]: https://img.shields.io/npm/v/@swarthy/wait-for.svg?style=flat-square
[npm-url]: https://npmjs.org/package/wait-for
[ci-image]: https://img.shields.io/travis/swarthy/wait-for/master.svg?style=flat-square
[ci-url]: https://travis-ci.com/swarthy/wait-for
[daviddm-image]: http://img.shields.io/david/swarthy/wait-for.svg?style=flat-square
[daviddm-url]: https://david-dm.org/swarthy/wait-for
[snyk-image]: https://snyk.io/test/npm/@swarthy/wait-for/badge.svg
[snyk-url]: https://snyk.io/test/npm/@swarthy/wait-for
