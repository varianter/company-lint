# Company Lint Tool

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

## CLI

This is a tool for helping tracking results and construct/modify lint rules. You
can run the CLI by doing:

```
npx @variant/lint
```

This whill, if you have stored auth info (see section below), create (or update
if you have existing data sets) a new lint rule set through a guide. To see all
commands check

```
npx @variant/lint --help
```

### Connecting to database

You need to have an API running to use this lint CLI. You can set up your own
using the code from this repo: https://github.com/varianter/company-lint

When you have an API running, you can store connection details by using the CLI:

```
npx @variant/cli config -api "https://YOUR_URL" -token "<OPTIONAL_TOKEN_HERE>"
```
