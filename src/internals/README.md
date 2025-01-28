# Internals

This folder contains the source code for the internals of API Framework, including the core classes and utilities that power it: Router, Handler, etc...

This code is currently not tested and is therefor excluded from the coverage report.

## Contents

- **[AsyncRouter](./async-router.md)**: A class that simplifies the creation of asynchronous route handlers in Express.js by providing request validation, error handling, and dependency injection.
- **[createApp](./create-app.md)**: A factory function that creates and configures an Express.js application with essential middlewares, route handlers, and default responses.
- **[getConfig](./get-config.md)**: A utility function that loads and validates configuration settings from environment variables using Zod schemas.

