import APIError from "./helpers/APIError";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      ...headers,
      ...options.headers,
    },
    ...options,
  });

  let data = await response.text();

  try {
    data = JSON.parse(data);
  } catch (error) {}

  if (!response.ok) {
    if (typeof data === "object" && data !== null) {
      const message = (data as { error?: string }).error || "Error desconocido";
      const code = (data as { code?: string }).code || null;
      throw new APIError(message, response.status, code, data);
    }

    throw new APIError(String(data), response.status);
  }

  return data as T;
}

const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T>(endpoint: string, body?: any) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(endpoint: string, body?: any) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};

export default api;
