# jest-badges-action

![Code quality](https://img.shields.io/codefactor/grade/github/jpb06/jest-badges-action?logo=codefactor)
![Total coverage](./badges/coverage-global%20coverage.svg)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/jest-badges-action/checks?label=last%20workflow&logo=github-actions)
![Last commit](https://img.shields.io/github/last-commit/jpb06/jest-badges-action?logo=git)
![Commits activity](https://img.shields.io/github/commit-activity/m/jpb06/jest-badges-action?logo=github)

## :zap: Description

This github action generates testing coverage badges using jest and pushes them back to the repo.

## :zap: Inputs

### :diamonds: `major-keywords`

Commits messages starting with these keywords will trigger a major bump. Commas may be used to specify more than one keyword

> Default value: **[Major]:**

## :zap: Usage

### :diamonds: Using defaults

If the action runs on a commit whose message starts with either `[Major]:`, `[Minor]:` or `[Patch]:`, the version will be bumped and a tag will be created.

```yaml
name: package bump
on: [push]
jobs:
  bump:
    runs-on: ubuntu-latest
    steps:
    - name: Check out repository code
      uses: actions/checkout@v2
    [...]
    - uses: actions/bump-package@v2.1.1
```
