import { apiRequest } from "../request";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export async function loginRequest(data: LoginRequest): Promise<LoginResponse> {
  const result = await apiRequest<LoginResponse, LoginRequest>({
    endpoint: "/api/auth/login",
    method: "POST",
    body: data,
  });

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.data;
}
