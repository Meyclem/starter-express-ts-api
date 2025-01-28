# `AsyncRouter` Class Documentation

## Overview

The `AsyncRouter` class is a custom router implementation for an Express.js application that simplifies the process of handling asynchronous route handlers and request validation using `zod` schemas. It provides a structured way to define routes with typed request parameters and bodies, ensuring that incoming requests are validated before being processed by the route handlers.

## What It Does

- **Route Definition**: Allows defining routes (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`) with associated handlers.
- **Request Validation**: Validates request parameters and bodies using `zod` schemas.
- **Error Handling**: Provides a centralized error handling mechanism for various types of errors, including validation errors and unexpected errors.
- **Dependency Injection**: Injects dependencies (e.g., logger) into route handlers for better modularity and testability.

## How It Does It

1. **Initialization**:
   - The `AsyncRouter` class is initialized with a set of dependencies, such as a logger.
   - It creates an instance of an Express router.

2. **Handler Method**:
   - The `handler` method is a private method that wraps the provided route handler with additional logic for request validation and error handling.
   - It parses and validates the request parameters and body using the provided `zod` schemas.
   - It invokes the actual route handler with the validated data and dependencies.
   - It catches and handles errors, logging them and sending appropriate responses to the client.

3. **Route Methods**:
   - The class provides methods (`get`, `post`, `patch`, `put`, `delete`) to define routes.
   - Each method accepts the route path, an object containing the handler, parameter schema, and body schema, and an optional object containing middlewares.
   - These methods use the `handler` method to wrap the provided route handler with validation and error handling logic.

4. **Express Router Integration**:
   - The `getExpressRouter` method returns the underlying Express router instance, which can be used in the main application to mount the routes.

## Why

- **Type Safety**: By using `zod` schemas for request validation, the `AsyncRouter` ensures that the request data conforms to the expected types, reducing runtime errors and improving type safety.
- **Centralized Error Handling**: The class provides a centralized mechanism for handling different types of errors, making the codebase cleaner and more maintainable.
- **Modularity**: The use of dependency injection allows for better modularity and testability of route handlers.
- **Simplified Asynchronous Handling**: The class simplifies the process of handling asynchronous route handlers, ensuring that errors are properly caught and handled.

## Example Usage

```typescript
import { z } from "zod";
import { AsyncRouter } from "./internals/async-router";
import logger from "./internals/logger";

const dependencies = { logger };
const router = new AsyncRouter(dependencies);

const paramsSchema = z.object({});
// 👀 An empty zod schema means there's no query or url params for this endpoint

const bodySchema = z.object({
  name: z.string(),
  tag: z.string().optional(),
});
// 👀 An empty zod schema means there's no body object for this endpoint

export const post: Handler<
  typeof postParams,
  typeof postBody,
  paths["/pets"]["post"]["responses"]["201"]["content"]["application/json"]
> = ({ body }) => async (request, response) => {
  const pet: components["schemas"]["Pet"] = { id: 1, name: body.name, tag: body.tag };
  response.json(pet);
};

router.post(
  "/pets",
  {
    handler,
    params: paramsSchema,
    body: bodySchema,
  },
);

export default router.getExpressRouter();
```

In this example, the `AsyncRouter` is used to define a `POST` route for creating a `Pet`. The request parameters and body are validated using zod schemas, and the route handler logs a message and sends a response with the created pet.

