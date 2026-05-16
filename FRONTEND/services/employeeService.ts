import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api';

async function handleResponse(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { success: res.ok, data: text };
  }
}

export const employeeService = {
  async create(payload: Record<string, any>) {
    const url = `${API_BASE_URL}${API_ENDPOINTS.employees.create}`;
    const form = new FormData();

    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val === undefined || val === null) return;
      if (key === 'img_file' && typeof val === 'object' && val.uri) {
        // React Native file object
        form.append('img_file', {
          uri: val.uri,
          name: val.name || 'image.jpg',
          type: val.type || 'image/jpeg',
        } as any);
      } else {
        form.append(key, String(val));
      }
    });

    const res = await fetch(url, {
      method: 'POST',
      body: form,
      // Do not set Content-Type; let RN attach boundary
    });
    return handleResponse(res);
  },

  async update(id: string | number | bigint, payload: Record<string, any>) {
    const url = `${API_BASE_URL}${API_ENDPOINTS.employees.update(id)}`;
    const form = new FormData();

    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val === undefined || val === null) return;
      if (key === 'img_file' && typeof val === 'object' && val.uri) {
        form.append('img_file', {
          uri: val.uri,
          name: val.name || 'image.jpg',
          type: val.type || 'image/jpeg',
        } as any);
      } else {
        form.append(key, String(val));
      }
    });

    // For Laravel compatibility: override method to PUT
    form.append('_method', 'PUT');

    const res = await fetch(url, {
      method: 'POST', // some backends accept POST with _method=PUT; adjust if needed
      body: form,
    });
    return handleResponse(res);
  },
};

export default employeeService;
