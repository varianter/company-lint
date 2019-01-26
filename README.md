# WIP Variant Lint tool

Tool for tracking Variant company linting statuses. Includes both CLI, API, and
potential website and reporting.

## Running locally

### DB Connection

To connect to a MongoDB database, copy and rename the `.env.example` file and
set connection string to `DB_CONNECTION_STRING`. This will allow you to connect
to the database. Also set `DB_DATABASE_NAME`

### Running

API services run indevidually as endpoints in a serverless infrastructure. To
run locally you can start each service by running the following command:

```sh
npm run dev ./api/add/index.ts

# or

npm run dev ./api/all/index.ts
```

## Optional Authorization

Theres an optional authorization for `add` endpoint. Setting the `ACCESS_TOKEN`
env will cause you
