import { getAccessToken } from "../coockie/getAccess";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function FetcherAuth(
  url: string,
  options: FetchOptions = {},
): Promise<Response> {
  const method = options.method || "GET";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const accessToken = getAccessToken();

  if (accessToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let res: Response = await fetch(url, {
    ...options,
    method,
    headers,
    credentials: "include",
  });

  if (res.status === 401 || res.status === 403) {
    const refreshRes = await fetch("http://localhost:3001/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      return res;
    }

    const data = await refreshRes.json();

    if (data.accessToken) {
      const cookieRes = await fetch("/api/auth/set-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ accessToken: data.accessToken }),
      });

      if (!cookieRes.ok) {
        return res;
      }

      res = await fetch(url, {
        ...options,
        method,
        headers: {
          ...headers,
          Authorization: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      });
    } else {
      return res;
    }
  }

  return res;
}
