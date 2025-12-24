import logger from "@/services/logger/logger";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET ?? "DevelopmentAccessSecret!X";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  logger.info(`[Auth Middleware - JWT] - Verifying access token`);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn(`[Auth Middleware - JWT] - Authorization header not found`);
    return res.status(401).send({
      code: "TOKEN_MISSING",
      message: "Access token not provided",
    });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    logger.warn(`[Auth Middleware - JWT] - Token malformatted`);
    return res.status(401).send({
      code: "TOKEN_MALFORMED",
      message: "Token malformatted",
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    logger.warn(`[Auth Middleware - JWT] - Invalid token scheme`);
    return res.status(401).send({
      code: "TOKEN_MALFORMED",
      message: "Token malformatted",
    });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);

    res.locals.user = decoded;

    logger.info(`[Auth Middleware - JWT] - Access token valid, proceeding`);

    return next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      logger.warn(`[Auth Middleware - JWT] - Access token expired`);
      return res.status(401).send({
        code: "TOKEN_EXPIRED",
        message: "Access token expired",
      });
    }

    logger.error(`[Auth Middleware - JWT] - Invalid token: ${error}`);
    return res.status(403).send({
      code: "TOKEN_INVALID",
      message: "Invalid access token",
    });
  }
}
