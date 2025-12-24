import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import logger from "@/services/logger/logger";
import { prisma } from "@/infra/prisma";

const ACCESS_SECRET = process.env.ACCESS_SECRET ?? "DevelopmentAccessSecret!X";

const ACCESS_TOKEN_EXPIRES_IN = "30m";
const REFRESH_TOKEN_EXPIRES_DAYS = 15;

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export default async function refreshController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body;

  logger.info(`[Auth Controller - Refresh] - Refresh requested`);

  if (!refreshToken) {
    logger.warn(
      `[Auth Controller - Refresh] - Missing refresh token in request`
    );
    return res.status(400).send({ message: "Refresh token required" });
  }

  try {
    const refreshTokenHash = hashToken(refreshToken);

    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        tokenHash: refreshTokenHash,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
      include: {
        User: true,
      },
    });

    if (!storedToken) {
      logger.warn(
        `[Auth Controller - Refresh] - Invalid or expired refresh token`
      );
      return res.status(401).send({ message: "Invalid refresh token" });
    }

    logger.info(`[Auth Controller - Refresh] - Refresh token valid, rotating`);

    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    const accessToken = jwt.sign(
      {
        sub: storedToken.userId,
        scopes: [],
      },
      ACCESS_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        algorithm: "HS256",
      }
    );

    const newRefreshToken = crypto.randomBytes(64).toString("hex");
    const newRefreshTokenHash = hashToken(newRefreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS);

    await prisma.refreshToken.create({
      data: {
        userId: storedToken.userId,
        tokenHash: newRefreshTokenHash,
        expiresAt,
      },
    });

    logger.info(`[Auth Controller - Refresh] - Tokens rotated successfully`);

    return res.status(200).send({
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 30 * 60,
    });
  } catch (e) {
    logger.error(`[Auth Controller - Refresh] - Error while refreshing token`);
    logger.error(e);

    return res.status(500).send();
  } finally {
    next();
  }
}
