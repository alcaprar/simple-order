import { pino, type Logger } from "pino";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      log: function (): Logger {
        const logger = pino({
          level: 'debug'
        });

        return logger;
      },
    },
  };
});
