[![🧪 Test](https://github.com/Meyclem/typescript-boilerplate/actions/workflows/test.yml/badge.svg)](https://github.com/Meyclem/typescript-boilerplate/actions/workflows/test.yml)
[![🔬 Lint & Build](https://github.com/Meyclem/typescript-boilerplate/actions/workflows/test.yml/badge.svg)](https://github.com/Meyclem/typescript-boilerplate/actions/workflows/lint.yml)

# [starter] Express TypeScript API

This is a bare simple boilerplate. Feel free to clone it and use it as you want.
You can also click on the `Use this template` button to create a new repo with the same structure.

In any case, feel free to use it as you want 😁👍

## Dependencies

It comes with some packages pre-installed:

- [TypeScript](https://www.typescriptlang.org/docs/home.html)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [jest](https://jestjs.io/)
- [express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [helmet](https://helmetjs.github.io/)
- [morgan](https://github.com/expressjs/morgan)

## Usage

### Installation

The boilerplate uses:

- node `20.12.2`.
- yarn `1.22.19`

In case you don't have them install, you can

- use [asdf](https://asdf-vm.com/guide/getting-started.html#_2-download-asdf) which will install the right versions based on the `.tool-versions` file.
- head to the [nodejs](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/en/docs/install) websites to install them manually.

Create a `.env` file at the root of the project with the following command:

```bash
cp -n .env.example .env
```

Then install the dependencies:

```bash
yarn install
```

### Codebase

There a few files you might want to look at:

- [.github/dependabot.yml](.github/dependabot.yml): change the schedule to fit your needs and don't forget to change my name by yours 😉
- [.github/lint.yml](.github/lint.yml): the linter and build workflow for Github Actions.
- [.github/test.yml](.github/test.yml): the test workflow for Github Actions.
- [src/index.ts](src/index.ts): the main file of the repository.
- [src/utils/index.ts](src/utils/index.ts): a simple `testFunction` just to check if the tests are working.
- [tests/checkup.test.ts](tests/checkup.test.ts): a simple test to check if the CI is working and Dependabot'PRs are ok to merge.

### Start the main file

```bash
## In local development mode
yarn dev

## In production mode
yarn start
```

### Build the JS files

```bash
yarn build
```

### Linter

You can use eslint to help you format your code.

```bash
yarn lint
```

### Tests

🔎 The only test is there to be sure the code runs in CI without issue due to possible failed dependancy update.

```bash
yarn test
```

You can also separate the tests in two parts:

- Unit tests

```bash
yarn test:unit
```

- Integration tests

```bash
yarn test:integration
```
