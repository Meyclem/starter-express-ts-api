import { config } from "../../config";
import { AsyncRouter } from "../../internals/async-router";
import { logger } from "../../internals/logger";

import * as pets from "./handler";

const router = new AsyncRouter({ logger, config });

router.get("/:id", {
  handler: pets.get,
  params: pets.getParamsSchema,
  body: pets.getBodySchema,
});

router.get("/", {
  handler: pets.list,
  params: pets.listParamsSchema,
  body: pets.listBodySchema,
});

router.post("/", {
  handler: pets.post,
  params: pets.postParamsSchema,
  body: pets.postBodySchema,
});

export default router.getExpressRouter();
