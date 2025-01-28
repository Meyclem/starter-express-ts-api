import morgan, { StreamOptions } from "morgan";

import { logger } from "./logger";

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

export default morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip },
);
