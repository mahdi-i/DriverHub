import { BASE_URL } from "../basic-link/backendBasicLink";
import { getAccessTokenSSR, getRefreshTokenSSR } from "../coockie/getAccess";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function FetcherAuth(
  url: string,
  options: FetchOptions = {},
): Promise<Response> {
  const method = options.method || "GET";

  const accessToken = getAccessTokenSSR();
  console.log(accessToken, "accessToken");
  const refreshToken = getRefreshTokenSSR();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (accessToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : null,
    refreshToken ? `refreshToken=${refreshToken}` : null,
  ]
    .filter(Boolean)
    .join("; ");
  console.log(cookieHeader, "cookieHeader");
  let res: Response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    method,
    headers,
    credentials: "include",
  });
  console.log(res, "res res");
  if (res.status === 401 || res.status === 403) {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });
    console.log(refreshRes, "refreshRes");
    if (!refreshRes.ok) {
      return res;
    }

    const data = await refreshRes.json();
    console.log(data, "data data data");
    if (data.accessToken) {
      res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        method,
        headers: {
          ...headers,
          Authorization: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      });
    }
  }

  return res;
}
