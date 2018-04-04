# wait-for-postgres

*wait-for-postgres* will try connect to PostgreSQL server and exit with code ```0``` if server is available and ```1``` otherwise.

Uses [pg](https://www.npmjs.com/package/pg) package

| Environment variable | Default value                 | Description              |
| -------------------- | ----------------------------- | ------------------------ |
| ```POSTGRESQL_URI``` | postgres://postgres@localhost | Connection string        |
| ```MAX_ATTEMPTS```   | 60                            | Max attempt count        |
| ```DELAY```          | 1000                          | Delay between attempts   |

### Usage example

```bash
wait-for-postgres && npm run test-integration

MAX_ATTEMPTS=5 wait-for-postgres && npm run test-integration
```
