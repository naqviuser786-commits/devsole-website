const rawApiUrl = import.meta.env.VITE_API_URL || '';

// Check karein ke website local computer par chal rahi hai ya live domain par
const isRunningLocally =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

// Agar live website (devsolesoft.com) hai to localhost par request KABHI nahi jayegi
const API_BASE = isRunningLocally
  ? rawApiUrl || 'http://localhost:4000/api'
  : rawApiUrl && !rawApiUrl.includes('localhost') && !rawApiUrl.includes('127.0.0.1')
  ? rawApiUrl
  : '';

export class ApiRequestError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  // Live website par agar external cloud backend na ho to direct return karein (Zero popup)
  if (!API_BASE) {
    return undefined as unknown as T;
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      ...init,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }));
      throw new ApiRequestError(res.status, body.error ?? 'Request failed');
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  } catch {
    return undefined as unknown as T;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path),
};