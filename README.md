# Company Culture Lint tool

You often have metrics for the business side of things for your company. But
measuring other goals is harder. E.g. are you on the right track for building
community? Are people feeling included? To better keep ourself in check, we are
experimenting with a
[company lint](<https://en.wikipedia.org/wiki/Lint_(software)>). A set of
quantifiable rules with goals we want to achieve. Every month we run the rule
set and see where we succeed on and where we fail.

If we fail, we consider what measures we take to make it green for the next
month. We also evaluate the rules and either leave them, remove them, change the
goal or the wording.

We think this is a great way to communicate measurable goals to the entire
company and build collective ownership for achieving them.

## About the repo

This repo contains both API and CLI tool for tracking these lint rules. You can
run the CLI out of the box on your own API and use this repo to deploy API to
[now.sh](https://now.sh)

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
