import { pino, type Logger } from "pino";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      log: function (): Logger {
        const logger = pino();

        return logger;
      },
    },
  };
});
