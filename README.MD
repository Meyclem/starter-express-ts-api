# [starter] Express TypeScript API

This is a bare simple boilerplate. Feel free to clone it and use it as you want.
You can also click on the `Use this template` button to create a new repo with the same structure.

In any case, feel free to use it as you want 😁👍

## Dependencies

It comes with some packages pre-installed and configured:

- [vitest](https://vitest.dev/) for test running.
- [tsx](https://tsx.is/) to execute TypeScript files.
- [zod](https://zod.dev/) for schema validation.
- [openapi-typescript](https://openapi-ts.dev/introduction) to generate types from [OpenAPI specs](https://swagger.io/specification/).

## Usage

### Installation

The boilerplate uses node `22.13.1`.

In case you don't have them install, you can

- use [asdf](https://asdf-vm.com/guide/getting-started.html#_2-download-asdf) which will install the right version based on the `.tool-versions` file.
- head to the [nodejs](https://nodejs.org/en/download/) install it manually.

Create a `.env` file at the root of the project with the following command:

```bash
cp -n .env.sample .env
```

Then install the dependencies:

```bash
npm install
```

### Codebase

To understand how the code is structured, you can read the [internals README](./src/internals/README.md).

### Build the JS files

```bash
npm run build
```

### Start the main file

```bash
## In local development mode
npm run dev

## In production mode
npm start
```

### Linter

You can use eslint to help you format your code.

```bash
npm run lint
```

### Tests

🔎 The only test is there to be sure the code runs in CI without issue due to possible failed dependancy update.

```bash
npm run test
## watch mode
npm run test:dev
```
