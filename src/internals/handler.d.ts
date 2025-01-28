import type { Request, Response } from "express";
import winston from "winston";
import { z } from "zod";

import type { Config } from "../config";

/**
 * @typedef Dependencies - The dependencies that a handler may need.
 * @property {winston.Logger} logger - A logger instance.
 */
export type Dependencies = {
  logger: winston.Logger;
  config: Config;
};

/**
 * @typedef Handler - A function that takes a context and dependencies and returns an Express handler.
 * @template Params - A Zod schema for the request parameters.
 * @template Body - A Zod schema for the request body.
 * @template ResponseType - The type of the response body. Can be inferred from the OpenAPI schema.
 * @type {function} - The Express handler function.
 * @param {object} context - The request handler context.
 * @param {Params} context.params - The **typed** request parameters.
 * @param {Body} context.body - The **typed** request body.
 * @param {Dependencies} dependencies - The handler dependencies. For example, a logger.
 * @returns {(request: Request, response: Response<ResponseType>) => Promise<void>}
  */
export type Handler<
  Params extends z.ZodTypeAny,
  Body extends z.ZodTypeAny,
  ResponseType = unknown,
> = (
  context: {
    params: z.infer<Params>,
    body: z.infer<Body>,
  },
  dependencies: Dependencies
) => (request: Request, response: Response<ResponseType>) => Promise<void>;
