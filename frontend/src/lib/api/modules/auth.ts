import { apiRequest } from "../request";

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export async function signupRequest(data: SignupRequest): Promise<AuthResponse> {
  const result = await apiRequest<AuthResponse, SignupRequest>({
    endpoint: "/api/auth/signup",
    method: "POST",
    body: data,
  });

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.data;
}

export async function loginRequest(data: LoginRequest): Promise<AuthResponse> {
  const result = await apiRequest<AuthResponse, LoginRequest>({
    endpoint: "/api/auth/login",
    method: "POST",
    body: data,
  });

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.data;
}
