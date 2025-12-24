import { Request, Response } from "express";
import * as crypto from "crypto";
import { prisma } from "@/infra/prisma";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function logoutController(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send();
  }

  const refreshTokenHash = hashToken(refreshToken);

  await prisma.refreshToken.updateMany({
    where: { tokenHash: refreshTokenHash },
    data: { revoked: true },
  });

  return res.status(204).send();
}
