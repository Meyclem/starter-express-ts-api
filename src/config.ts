import dotenv from "dotenv";
import { z } from "zod";

import getConfig from "./internals/get-config";

dotenv.config();

const configSchema = z.object({
  port: z.string().default("9000")
    .transform((value) => Number(value)),
  nodeEnv: z.enum(["development", "production", "test"]).default("development"),
});

const envVariables = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
};

export type Config = z.infer<typeof configSchema>;
export const config = getConfig<typeof configSchema>(configSchema, envVariables);
