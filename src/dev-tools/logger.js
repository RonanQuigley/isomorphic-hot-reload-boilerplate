import pino from "pino";

const environment = process.env.NODE_ENV;

const prettyPrintConfig =
  environment === "development"
    ? {
        levelFirst: true,
        translateTime: true,
        ignore: "pid,hostname"
      }
    : false;

const logger = pino({
  prettyPrint: prettyPrintConfig,
  environment: environment
});

export default logger;
