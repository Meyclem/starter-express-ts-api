[![CI testing](https://github.com/Meyclem/typescript-boilerplate/actions/workflows/test.yml/badge.svg)](https://github.com/Meyclem/typescript-boilerplate/actions/workflows/test.yml)
starter-express-ts-api
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

### Code sample

The repo has some files that should be removed or changed at cloning time:

- [.github/dependabot.yml](.github/dependabot.yml)
- [src/index.ts](src/index.ts)
- [tests/checkup.test.ts](tests/checkup.test.ts)

### Start the main file

```bash
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
