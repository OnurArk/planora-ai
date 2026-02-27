import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/api-error";
import { getCurrentUser, login, signup } from "./auth.service";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";

export async function signupHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      throw new ApiError(400, "name, email and password are required");
    }

    const result = await signup({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      throw new ApiError(400, "email and password are required");
    }

    const result = await login({ email, password });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

export async function meHandler(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      throw new ApiError(401, "Unauthorized");
    }

    const user = await getCurrentUser(req.userId);
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
}
