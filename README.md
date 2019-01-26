# WIP Variant Lint tool

Tool for tracking Variant company linting statuses. Includes both CLI, API, and
potential website and reporting.

## Running locally

### DB Connection

To connect to a MongoDB database, copy and rename the `.env.example` file and
set connection string to `DB_CONNECTION_STRING`. This will allow you to connect
to the database. Also set `DB_DATABASE_NAME`.

### Running entire topology

You can reproduce the entire API topology as running on now locally by doing:

```
npm run topology
```

This will reproduce the routing from now.sh on localhost.

### Running

You can also run API services indevidually locally, by starting each service
with:

```sh
npm run dev ./api/add/index.ts

# or
npm run dev ./api/all/index.ts

# ..etc
npm run dev ./api/<ENDPOINT>/index.ts
```

## Optional Authorization

Theres an optional authorization for `add` endpoint. Setting the `ACCESS_TOKEN`
env will opt-in Bearer token for the request. Requests must include header:

```
Authorization: Bearer <YOUR_TOKEN_FROM_ENV>
```
