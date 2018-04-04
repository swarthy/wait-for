# wait-for-rabbit

*wait-for-rabbit* will try connect to RabbitMQ server and exit with code ```0``` if server is available and ```1``` otherwise.

Uses [amqplib](https://www.npmjs.com/package/amqplib) package

| Environment variable | Default value                 | Description              |
| -------------------- | ----------------------------- | ------------------------ |
| ```RABBITMQ_URI```   | amqp://localhost              | Connection string        |
| ```MAX_ATTEMPTS```   | 60                            | Max attempt count        |
| ```DELAY```          | 1000                          | Delay between attempts   |

### Usage example

```bash
wait-for-rabbit && npm run test-integration

MAX_ATTEMPTS=5 wait-for-rabbit && npm run test-integration
```
