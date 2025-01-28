import express, { Request, Response, RequestHandler } from "express";
import { ZodError, type ZodTypeAny } from "zod";

import { apiErrorResponse, BadRequestError } from "../utils/error";

import type { Dependencies, Handler } from "./handler";

export class AsyncRouter {
  private router: express.Router;
  private dependencies: Dependencies;

  constructor(dependencies: Dependencies) {
    this.router = express.Router();
    this.dependencies = dependencies;
  }

  private handler<Params extends ZodTypeAny, Body extends ZodTypeAny>
  (schemas: { params: ZodTypeAny, body: ZodTypeAny }, func: Handler<Params, Body>) {
    return async (request: Request, response: Response): Promise<void> => {
      // patch to handle mounting error in express
      request.url = request.originalUrl;
      try {
        // Handle authentication here

        // Request parsing for params and body type validation.
        const params = schemas.params.parse(request.params);
        const body = schemas.body.parse(request.body);

        await func({ params, body }, this.dependencies)(request, response);
      } catch (error) {
        if (error instanceof ZodError) {
          return apiErrorResponse(response, 400, {
            title: "Bad Request",
            instance: request.url,
            detail: error.issues.map((issue) => issue.message),
          });
        } else if (error instanceof BadRequestError) {
          this.dependencies.logger.error(`Bad Request: ${error.message}`);
          return apiErrorResponse(
            response,
            400,
            {
              title: "Bad Request",
              detail: error.message,
              instance: request.url,
            },
          );
        } else if (
          error instanceof TypeError
          && error.message === "fetch failed"
          && error.cause instanceof Error
        ) {
          this.dependencies.logger.error(`Fetch error: ${error.cause.message}`);
        } else if (
          error instanceof TypeError
          && error.message === "fetch failed"
          && error.cause instanceof AggregateError
        ) {
          this.dependencies.logger.error(
            `Fetch error: ${error.cause.errors
              .map((error) => error.message)
              .join(", ")}`,
          );
        } else if (typeof error === "object" && error && "code" in error) {
          this.dependencies.logger.error(`unexpected error: ${error}`, {
            error,
          });
        } else {
          this.dependencies.logger.error(`unexpected error: ${error}`);
        }

        response.status(500).end();
      }
    };
  }

  get<Params extends ZodTypeAny, Body extends ZodTypeAny>(
    route: string,
    { handler, params, body }: {
      handler: Handler<Params, Body>,
      params: Params,
      body: Body,
    },
    { middlewares }: { middlewares: RequestHandler[] } = { middlewares: [] },
  ) {
    this.router.get(route, ...middlewares, this.handler({ params, body }, handler));
  }
  post<Params extends ZodTypeAny, Body extends ZodTypeAny>(
    route: string,
    { handler, params, body }: {
      handler: Handler<Params, Body>,
      params: Params,
      body: Body,
    },
    { middlewares }: { middlewares: RequestHandler[] } = { middlewares: [] },
  ) {
    this.router.post(route, ...middlewares, this.handler({ params, body }, handler));
  }
  patch<Params extends ZodTypeAny, Body extends ZodTypeAny>(
    route: string,
    { handler, params, body }: {
      handler: Handler<Params, Body>,
      params: Params,
      body: Body,
    },
    { middlewares }: { middlewares: RequestHandler[] } = { middlewares: [] },
  ) {
    this.router.patch(route, ...middlewares, this.handler({ params, body }, handler));
  }
  put<Params extends ZodTypeAny, Body extends ZodTypeAny>(
    route: string,
    { handler, params, body }: {
      handler: Handler<Params, Body>,
      params: Params,
      body: Body,
    },
    { middlewares }: { middlewares: RequestHandler[] } = { middlewares: [] },
  ) {
    this.router.put(route, ...middlewares, this.handler({ params, body }, handler));
  }
  delete<Params extends ZodTypeAny, Body extends ZodTypeAny>(
    route: string,
    { handler, params, body }: {
      handler: Handler<Params, Body>,
      params: Params,
      body: Body,
    },
    { middlewares }: { middlewares: RequestHandler[] } = { middlewares: [] },
  ) {
    this.router.delete(route, ...middlewares, this.handler({ params, body }, handler));
  }

  getExpressRouter() {
    return this.router;
  }
}
