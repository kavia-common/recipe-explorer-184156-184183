const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * PUBLIC_INTERFACE
 * apiFetch
 * A small wrapper around fetch that:
 * - prefixes REACT_APP_API_BASE_URL
 * - attaches Authorization: Bearer <token> if present (from localStorage 'token')
 * - handles JSON body/response by default
 * - throws on non-2xx responses with parsed error body when possible
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers || {});

  // Default JSON content-type for objects
  const isBodyObject =
    options.body && typeof options.body === 'object' && !(options.body instanceof FormData);

  if (isBodyObject && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Attach auth header if token exists
  try {
    const token = localStorage.getItem('token');
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  } catch {
    // localStorage not available, ignore
  }

  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    body: isBodyObject ? JSON.stringify(options.body) : options.body,
    credentials: options.credentials || 'include',
  };

  const res = await fetch(url, fetchOptions);
  let data = null;
  const contentType = res.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const error = new Error((data && data.message) || 'API Error');
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// PUBLIC_INTERFACE
export const api = {
  get: (path, opts = {}) => apiFetch(path, { ...opts, method: 'GET' }),
  post: (path, body, opts = {}) => apiFetch(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts = {}) => apiFetch(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts = {}) => apiFetch(path, { ...opts, method: 'PATCH', body }),
  del: (path, opts = {}) => apiFetch(path, { ...opts, method: 'DELETE' }),
};
