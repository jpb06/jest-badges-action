# jest-badges-action

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/jpb06/jest-badges-action)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/jest-badges-action/Tests?label=last%20workflow&logo=github-actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_jest-badges-action)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=security_rating)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=coverage)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
![Total coverage](./badges/coverage-jest%20coverage.svg)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jpb06_jest-badges-action)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_jest-badges-action)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_jest-badges-action)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_jest-badges-action)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_jest-badges-action&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=jpb06_jest-badges-action)
![Last commit](https://img.shields.io/github/last-commit/jpb06/jest-badges-action?logo=git)

Generating coverage badges and pushing them to the repository.

<!-- readme-package-icons start -->

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/github-actions.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/pnpm.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/conventional-changelog.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" /></a>&nbsp;<a href="https://jestjs.io/docs/getting-started" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/prettier.png" /></a>&nbsp;<a href="https://swc.rs/docs/getting-started" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/swc.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ Description

This github action generates testing coverage badges using jest and pushes them to the repo at `./badges`. There is five badges generated:

![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

You can use them on a readme like so:

```markdown
![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)
```

## ⚡ Requirements

You will need to add json-summary to coverage reporters in jest config:

```javascript
module.exports = {
   coverageReporters: ["json-summary"];
};
```

You also need to run jest before calling this action in your ci workflow. See `usage` for an example.

## ⚡ Inputs

### 🔶 `branches`

Branches on which the badges should be generated, separated by commas.

> Default value: **master,main**

### 🔶 `coverage-summary-path`

Jest coverage summary path (json-summary). Defining this may be useful if you need to run this action on a monorepo.

> Default value: **./coverage/coverage-summary.json**

## ⚡ Usage

Let's first define an npm script to run jest in package.json, specifying the coverage option to generate a coverage report:

```json
{
  "scripts": {
    "test-ci": "jest --ci --coverage"
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
      run: yarn test-ci
    [...]
    - name: Generating coverage badges
      uses: jpb06/jest-badges-action@latest
        with:
          branches: master,preprod,staging

```

The badges will be generated when the action runs on the master, preprod or staging branch.

### 🔶 Using a custom jest coverage summary file path

In case you need to define a custom path for the coverage summary file, you can use the `coverage-summary-path` input like so:

```yaml
    [...]
    - name: Generating coverage badges
      uses: jpb06/jest-badges-action@latest
        with:
          coverage-summary-path: ./my-module/coverage/coverage-summary.json
```
