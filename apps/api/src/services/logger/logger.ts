import pino from "pino";

export default pino(
  {
    level: process.env.LOGLEVEL || "info",
  }
  // pino.destination("latest-log.log")
);
