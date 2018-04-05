# wait-for

[![npm](https://img.shields.io/npm/v/@swarthy/wait-for.svg)](https://www.npmjs.com/package/@swarthy/wait-for)
[![Build Status](https://travis-ci.org/swarthy/wait-for.svg?branch=master)](https://travis-ci.org/swarthy/wait-for)

*wait-for-xxx* will try connect to server then exit with code ```0``` if server is available and ```1``` otherwise.

## Usage

### PostgreSQL

```bash
POSTGRESQL_URI=postgres://postgres@localhost wait-for-postgres && npm run test-integration
```

### RabbitMQ

```bash
RABBITMQ_URI=amqp://localhost wait-for-rabbit && npm run test-integration
```

### Redis

```bash
REDIS_URI=redis://localhost wait-for-redis && npm run test-integration
```

## Configuration

| Environment variable | Default value                 | Description              |
| -------------------- | ----------------------------- | ------------------------ |
| ```POSTGRESQL_URI``` | postgres://postgres@localhost | Connection string        |
| ```RABBITMQ_URI```   | amqp://localhost              | Connection string        |
| ```REDIS_URI```      | redis://localhost             | Connection string        |
| ```MAX_ATTEMPTS```   | 60                            | Max attempt count        |
| ```DELAY```          | 1000                          | Delay between attempts   |

*wait-for* will try connect to RabbitMQ server and exit with code ```0``` if server is available and ```1``` otherwise.

### Used packages

[amqplib](https://www.npmjs.com/package/amqplib)
[pg](https://www.npmjs.com/package/pg)
[redis](https://www.npmjs.com/package/redis)
