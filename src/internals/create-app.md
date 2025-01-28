# `createApp` Function Documentation

## Overview

The `createApp` function is a factory function that creates and configures an Express.js application. It sets up essential middlewares, applies route handlers, and configures default responses for unhandled routes. This function is designed to streamline the setup process for an Express.js application by providing a consistent and reusable configuration.

## What It Does

- **Middleware Setup**: Configures essential middlewares such as request logging, security headers, CORS, and JSON body parsing.
- **Route Registration**: Registers provided routers with their respective prefixes.
- **Default Response**: Configures a default response for unhandled routes, returning a 404 status code.

## How It Does It

1. **Middleware Setup**:
   - **Request Logging**: Uses a custom request logging middleware to log HTTP requests.
   - **Security Headers**: Uses `helmet` to set various HTTP headers for security.
   - **CORS**: Uses `cors` to enable Cross-Origin Resource Sharing.
   - **JSON Body Parsing**: Uses `express.json()` to parse incoming JSON requests.
   - **Content-Type Header**: Sets the `Content-Type` header to `application/json` for all responses.

2. **Route Registration**:
   - Iterates over the provided routers and registers each one with its respective prefix using `app.use(prefix, router)`.

3. **Default Response**:
   - Configures a default response for unhandled routes, returning a 404 status code with a JSON message.

## Why

- **Consistency**: Provides a consistent setup for Express.js applications, ensuring that essential middlewares are always configured.
- **Reusability**: Encapsulates the application setup logic in a single function, making it reusable across different projects or parts of the same project.
- **Simplicity**: Simplifies the process of setting up an Express.js application by abstracting away the boilerplate code for middleware configuration and route registration.

## Example Usage

```typescript
import createApp from "./internals/create-app";
import logger from "./internals/logger";
import petsRouter from "./pet-store/router";

const app = createApp([{ prefix: "/pets", router: petsRouter }]);

app.listen(3000, () => {
  logger.info("Server is running on port 3000");
});
```

In this example, the `createApp` function is used to create an Express.js application with a single router for handling pet-related routes. The application listens on port 3000, and a log message is printed when the server starts.
