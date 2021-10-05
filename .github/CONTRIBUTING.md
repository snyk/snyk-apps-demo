# Contributing

## Contributor Agreement

A pull-request will only be considered for merging into the upstream codebase after you have signed our [contributor agreement](https://github.com/snyk/snyk/blob/master/Contributor-Agreement.md), assigning us the rights to the contributed code and granting you a license to use it in return. If you submit a pull request, you will be prompted to review and sign the agreement with one click (we use [CLA assistant](https://cla-assistant.io/)).

## Code standards

Ensure that your code adheres to the included `.eslintrc` config by running `npm run lint`.

## Sending pull requests

- add tests for newly added code (and try to mirror directory and file structure if possible)
- spell check
- PRs will not be code reviewed unless all tests are passing

_Important:_ when fixing a bug, please commit a **failing test** first so that CI can show the code failing. Once that commit is in place, then commit the bug fix, so that we can test _before_ and _after_.

Remember that you're developing for multiple platforms and versions of node, so if the tests pass on your Mac or Linux or Windows machine, it _may_ not pass elsewhere.
