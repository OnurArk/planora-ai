type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestOptions<TBody = unknown> = {
  endpoint: string;
  method?: ApiMethod;
  headers?: HeadersInit;
  body?: TBody;
};

type ApiSuccess<TResponse> = {
  ok: true;
  status: number;
  data: TResponse;
  error: null;
};

type ApiFailure = {
  ok: false;
  status: number;
  data: null;
  error: string;
};

export type ApiResult<TResponse> = ApiSuccess<TResponse> | ApiFailure;

const DEFAULT_API_BASE_URL = "http://localhost:4000";

export async function apiRequest<TResponse, TBody = unknown>(
  options: ApiRequestOptions<TBody>,
): Promise<ApiResult<TResponse>> {
  const {
    endpoint,
    method = "GET",
    headers = {},
    body,
  } = options;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

  try {
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const responseBody = (await response.json().catch(() => null)) as
      | TResponse
      | { message?: string }
      | null;

    if (!response.ok) {
      const errorMessage =
        (responseBody && typeof responseBody === "object" && "message" in responseBody
          ? responseBody.message
          : null) ?? "Request failed";

      return {
        ok: false,
        status: response.status,
        data: null,
        error: errorMessage,
      };
    }

    return {
      ok: true,
      status: response.status,
      data: responseBody as TResponse,
      error: null,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      data: null,
      error: "Server connection failed",
    };
  }
}
