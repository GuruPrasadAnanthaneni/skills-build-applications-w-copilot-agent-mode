export const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function buildApiUrl(component: string) {
  return `${apiBaseUrl}/${component}/`;
}

function normalizeArrayResponse<T>(data: unknown, key: string): T[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    const candidates = [key, 'data', 'results', 'items'];

    for (const candidate of candidates) {
      const value = record[candidate];
      if (Array.isArray(value)) {
        return value;
      }
    }
  }

  return [];
}

export async function fetchApi<T>(component: string, responseKey = component): Promise<T[]> {
  const url = buildApiUrl(component);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}) for ${url}`);
  }

  const json = await response.json();
  return normalizeArrayResponse<T>(json, responseKey);
}
