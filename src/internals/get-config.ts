import { z } from "zod";

const getConfig = <Config extends z.ZodTypeAny>(
  configSchema: z.ZodTypeAny,
  config: Record<string, unknown>,
): z.infer<Config> => {
  try {
    return configSchema.parse(config);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("💥 Config error 💥");
    if (error instanceof z.ZodError) {
      // eslint-disable-next-line no-console
      console.error(error.errors.map((error) => `- ${error.path}: ${error.message}`).join("\n"));
      process.exit(1);
    }
  }
};

export default getConfig;
