import petsRouter from "./api/pet-store/router";
import { config } from "./config";
import createApp from "./internals/create-app";
import { logger } from "./internals/logger";

const app = createApp([{ prefix: "/pets", router: petsRouter }]);

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
