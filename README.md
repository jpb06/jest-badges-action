# jest-badges-action

![Code quality](https://img.shields.io/codefactor/grade/github/jpb06/jest-badges-action?logo=codefactor)
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

## :zap: Usage

Let's first define an npm script to run jest in package.json:

```json
{
  "scripts": {
    "test:ci": "jest --ci --runInBand"
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
    - uses: actions/jest-badges-action@v1.1.0
```
