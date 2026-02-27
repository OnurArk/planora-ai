import { Router } from "express";
import { loginHandler, meHandler, signupHandler } from "./auth.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", signupHandler);
authRouter.post("/login", loginHandler);
authRouter.get("/me", requireAuth, meHandler);

export { authRouter };
