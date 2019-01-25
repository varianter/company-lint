# WIP Variant Lint tool

Tool for tracking Variant company linting statuses. Includes both CLI, API, and
potential website and reporting.

## Running locally

API services run indevidually as endpoints in a serverless infrastructure. To
run locally you can start each service by running the following command:

```sh
npm run dev ./api/add/index.ts

# or

npm run dev ./api/all/index.ts
```
