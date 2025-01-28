import cors from "cors";
import express from "express";
import type { Application, Response, Request, Router } from "express";
import helmet from "helmet";

import requestLogMiddleware from "./request-log.middleware";

export default function createApp(
  routers: {
    prefix: string,
    router: Router
  }[],
): Application {
  const app = express();
  // Basic middlewares
  app.use(requestLogMiddleware);
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use((request: Request, response: Response, next) => {
    response.setHeader("Content-Type", "application/json");
    next();
  });

  // Routes
  routers.forEach(({ prefix, router }) => {
    app.use(prefix, router);
  });

  app.get("*", (request: Request, response: Response) => {
    response.status(404).send({ message: "Not Found" });
  });

  return app;
};
