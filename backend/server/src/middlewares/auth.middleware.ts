import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/api-error";

type JwtPayload = {
  userId: string;
};

export type AuthenticatedRequest = Request & {
  userId?: string;
};

export function requireAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized"));
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    req.userId = payload.userId;
    return next();
  } catch {
    return next(new ApiError(401, "Invalid token"));
  }
}
