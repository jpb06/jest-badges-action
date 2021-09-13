# jest-badges-action

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/jpb06/jest-badges-action)
![Code quality](https://img.shields.io/codefactor/grade/github/jpb06/jest-badges-action?logo=codefactor)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=security_rating)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=coverage)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
![Total coverage](./badges/coverage-global%20coverage.svg)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/jest-badges-action/checks?label=last%20workflow&logo=github-actions)
![Last commit](https://img.shields.io/github/last-commit/jpb06/jest-badges-action?logo=git)
![Commits activity](https://img.shields.io/github/commit-activity/m/jpb06/jest-badges-action?logo=github)

## :zap: Description

This github action generates testing coverage badges using jest and pushes them back to the repo.

## :zap: Requirements

You will need to add json-summary to coverage reporters in jest config:

```javascript
module.exports = {
   coverageReporters: ["json-summary"];
};
```

You also need to run jest before calling this action in your ci workflow. See `usage` for an example.

## :zap: Inputs

### :diamonds: `branches`

Branches on which the badges should be generated, separated by commas.

> Default value: **master**

### :diamonds: `coverage-summary-path`

Jest coverage summary path (json-summary). Defining this may be useful if you need to run this action on a monorepo.

> Default value: **./coverage/coverage-summary.json**

## :zap: Usage

Let's first define an npm script to run jest in package.json, specifying the coverage option to generate a coverage report:

```json
{
  "scripts": {
    "test:ci": "jest --ci --runInBand --coverage"
  }
}
```

Let's then define our workflow:

```yaml
name: My ci things
on: [push]
jobs:
  bump:
    runs-on: ubuntu-latest
    steps:
    # Necessary to push the generated badges to the repo
    - name: Check out repository code
      uses: actions/checkout@v2
    # Necessary to generate the coverage report.
    # Make sure to add 'json-summary' to the coverageReporters in jest options
    - name: Tests
      run: yarn test:ci
    [...]
    - name: Generating coverage badges
      uses: actions/jest-badges-action@latest
        with:
          branches: master,preprod,staging

```

The badges will be generated when the action runs on the master, preprod or staging branch.

### :diamonds: Using a custom jest coverage summary file path

In case you need to define a custom path for the coverage summary file, you can use the `coverage-summary-path` input like so:

```yaml
    [...]
    - name: Generating coverage badges
      uses: actions/jest-badges-action@latest
        with:
          coverage-summary-path: ./my-module/coverage/coverage-summary.json
```
