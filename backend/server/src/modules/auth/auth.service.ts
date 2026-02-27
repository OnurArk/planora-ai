import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";
import { ApiError } from "../../utils/api-error";
import { getUserStore } from "./auth.store";

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResult = {
  token: string;
  user: PublicUser;
};

function toPublicUser(user: { id: string; name: string; email: string }): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function createToken(userId: string) {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign({ userId }, env.jwtSecret, options);
}

export async function signup(input: SignupInput): Promise<AuthResult> {
  const userStore = getUserStore();
  const normalizedEmail = input.email.toLowerCase();
  const existingUser = await userStore.findByEmail(normalizedEmail);
  if (existingUser) {
    throw new ApiError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await userStore.create({
    name: input.name,
    email: normalizedEmail,
    password: hashedPassword,
  });

  const publicUser = toPublicUser(user);
  return {
    token: createToken(publicUser.id),
    user: publicUser,
  };
}

export async function login(input: LoginInput): Promise<AuthResult> {
  const userStore = getUserStore();
  const user = await userStore.findByEmail(input.email.toLowerCase());
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const publicUser = toPublicUser(user);
  return {
    token: createToken(publicUser.id),
    user: publicUser,
  };
}

export async function getCurrentUser(userId: string): Promise<PublicUser> {
  const userStore = getUserStore();
  const user = await userStore.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return toPublicUser(user);
}
