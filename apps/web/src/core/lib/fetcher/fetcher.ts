import { BASE_URL } from "../basic-link/BackendBasicLink";
import { getAccessToken, getAccessTokenSSR } from "../coockie/getAccess";

export async function FetcherFunc({
  method,
  path,
  headers: customHeaders,
  forceClientCookie = false,
}: {
  method?: "GET" | "POST" | "DELET" | "PUt";
  path: string;

  headers?: Record<string, string>;
  forceClientCookie?: boolean;
}) {
  let token: string | null = null;

  if (forceClientCookie) {
    token = getAccessToken();
  } else {
    token = await getAccessTokenSSR();
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    ...customHeaders,
  };

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        message: data?.message || `HTTP error! status: ${res.status}`,
        errors: data.errors,
        data: data,
      };
    }
    if (data === null) {
      return null;
    }

    if (res.status === 204) {
      return null;
    }
    return data;
  } catch (error) {
    throw error;
  }
}
