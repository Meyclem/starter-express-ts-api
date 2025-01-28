# `getConfig` Function Documentation

## Overview

The `getConfig` function is a utility function that validates and parses configuration settings using `zod` schemas. It ensures that the configuration settings conform to the expected types and formats, providing a reliable way to manage application configuration.

## What It Does

- **Configuration Validation**: Validates the provided configuration settings against a `zod` schema.
- **Error Handling**: Logs detailed error messages if the validation fails and exits the process.
- **Type Inference**: Infers the configuration type from the provided `zod` schema.

## How It Does It

1. **Schema Parsing**:
   - The function accepts a `zod` schema and a configuration object.
   - It attempts to parse the configuration object using the provided schema.

2. **Error Handling**:
   - If the parsing fails, the function logs a detailed error message, including the specific validation errors.
   - It exits the process to prevent the application from running with invalid configuration settings.

## Why

- **Type Safety**: Ensures that the configuration settings conform to the expected types, reducing runtime errors.
- **Reliability**: Provides a reliable way to manage application configuration by validating settings at startup.
- **Debugging**: Logs detailed error messages to help identify and fix configuration issues quickly.

## Example Usage

```typescript
import dotenv from "dotenv";
import { z } from "zod";

import getConfig from "./internals/get-config";

dotenv.config();

const configSchema = z.object({
  port: z.string()
    .default("9000")
    .transform((value) => Number(value)),
  nodeEnv: z.enum(["development", "production", "test"]).default("development"),
});

const envVariables = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
};

export type Config = z.infer<typeof configSchema>;
export const config = getConfig<typeof configSchema>(configSchema, envVariables);
```

The `Config` type is used in the `AsyncRouter` when configuration is injected in the router creation:

```typescript
import { config } from "../config";
import { AsyncRouter } from "../internals/async-router";
import logger from "../internals/logger";

import * as pets from "./handler";

const router = new AsyncRouter({ logger, config });
```

And then the `config` object can be used in the handler:

```typescript
export const get: Handler<
  typeof paramsSchema,
  typeof bodySchema,
> = ({}, { config }) => async (request, response) => {
  response.json({ message: `Environment: ${config.nodeEnv}` });
};
```

## Testing

If you need to modify some Config values during testing, you can do so by mocking the `config` object:

```typescript
import { describe, it, expect, vi } from "vitest";

vi.mock("path-to/config", () => {
  return {
    config: {
      port: 3000,
      nodeEnv: "test",
    },
  };
});
```
