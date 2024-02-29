# jest-badges-action

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/jpb06/jest-badges-action)
![Github workflow](https://img.shields.io/github/actions/workflow/status/jpb06/jest-badges-action/tests-scan.yml?branch=master&logo=github-actions&label=last%20workflow)
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

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Pnpm-Dark.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/CommitLint.Dark.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Eslint-Dark.svg" /></a>&nbsp;<a href="https://jestjs.io/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Jest.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Prettier-Dark.svg" /></a>&nbsp;<a href="https://swc.rs/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Swc-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

# 😺 This action is replaced by [coverage-badges-action](https://github.com/jpb06/coverage-badges-action)

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

### 🔶 `no-commit`

If set to `true`, badges won't be committed by the github action.

> Default value: *false**

### 🔶 `branches`

Branches on which the badges should be generated, separated by commas. Optionally, you can set the value as `*` to specify generation should always happen.

> Default value: **master,main**

### 🔶 `target-branch`

The branch on which generated badges should be pushed. If unset, the current branch (on which the action is ran against) will be used.

### 🔶 `coverage-summary-path`

Jest coverage summary path (json-summary). Defining this may be useful if you need to run this action on a monorepo.

> Default value: **./coverage/coverage-summary.json**

### 🔶 `commit-message`

Commit message of the commit with generated badges.

> Default value: **Updating coverage badges**

### 🔶 `commit-user`

Customizing the name of the user committing generated badges (optional).

> Default value: **<context.actor>**

### 🔶 `commit-user-email`

Customizing the email of the user committing generated badges (optional).

> Default value: **<context.actor>@users.noreply.github.com**

### 🔶 `output-folder`

Where badges should be written (optional).

> Default value: **./badges**

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
      uses: actions/checkout@v3
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

### 🔶 Pushing generated badges to a custom branch

Your perpetual branches should be protected to avoid some people from force pushing on them for example. Sadly there is no way to push badges to a protected branch 😿.

A workaround is to push them to a custom branch. Here is an example using a `badges` branch:

```yaml
name: Generate badges on custom branch

on:
  push:
    branches:
      - master

jobs:
  generate-badges-on-custom-branch:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - uses: pnpm/action-setup@v2.2.4
        with:
          version: latest

      - name: Setup node
        uses: actions/setup-node@v3
        with:
          node-version-file: '.node-version'
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'

      - name: Installing dependencies
        run: pnpm install --frozen-lockfile

      - name: Delete remote badges branch
        run: git push origin --delete badges

      - name: Create badges branch
        run: git checkout -b badges

      - name: Tests
        run: pnpm test-ci

      - name: Generating coverage badges
        uses: ./
        with:
          branches: '*'
          target-branch: badges

      - name: Push badges branch
        run: git push origin badges
```
