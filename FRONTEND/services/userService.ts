import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api';

async function handleResponse(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { success: res.ok, data: text };
  }
}

export const userService = {
  async create(payload: Record<string, any>) {
    const url = `${API_BASE_URL}${API_ENDPOINTS.users.create}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async update(id: string | number | bigint, payload: Record<string, any>) {
    const url = `${API_BASE_URL}${API_ENDPOINTS.users.update(id)}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async delete(id: string | number | bigint) {
    const url = `${API_BASE_URL}${API_ENDPOINTS.users.delete(id)}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },
};

export default userService;
