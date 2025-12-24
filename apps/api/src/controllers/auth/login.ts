import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import logger from "@/services/logger/logger";
import { prisma } from "@/infra/prisma";

const ACCESS_SECRET = process.env.ACCESS_SECRET ?? "DevelopmentAccessSecret!X";

const ACCESS_TOKEN_EXPIRES_IN = "30m";
const REFRESH_TOKEN_EXPIRES_DAYS = 15;

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export default async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { nome, senha } = req.body;

  logger.info(
    `[Auth Controller - Login] - Server issued to login user ${nome}`
  );

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { userName: nome },
    });

    logger.info(`[Auth Controller - Login] - Comparing hashes`);

    const passwordMatch = bcrypt.compareSync(senha, user.passwordHash);

    if (!passwordMatch) {
      logger.warn(
        `[Auth Controller - Login] - Hash not matched! Sending 403 response`
      );
      return res.status(403).send({ message: "Invalid credentials" });
    }

    logger.info(`[Auth Controller - Login] - Hash matched! Preparing tokens`);

    const accessToken = jwt.sign(
      {
        sub: user.id,
        scopes: [],
      },
      ACCESS_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        algorithm: "HS256",
      }
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");
    const refreshTokenHash = hashToken(refreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt,
      },
    });

    logger.info(`[Auth Controller - Login] - Tokens generated successfully`);

    return res.status(200).send({
      accessToken,
      refreshToken,
      expiresIn: 30 * 60,
      user: {
        id: user.id,
        nome: user.userName,
      },
    });
  } catch (e: any) {
    if (e.code === "P2025") {
      logger.warn(
        `[Auth Controller - Login] - This user does not exist! Sending 404 response`
      );
      return res.status(404).send({
        message: "Operador não encontrado",
      });
    }

    logger.error(
      `[Auth Controller - Login] - Server error while processing login`
    );
    logger.error(e);

    return res.status(500).send();
  } finally {
    next();
  }
}
