import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'

interface MakeRequestConfig {
  url: string,
  withcCredentials?: RequestCredentials | true;
  body?: Record<PropertyKey, any>,
  method?: 'GET' | 'POST',
}

export const makeRequest = <T extends any>(config: MakeRequestConfig) => {
  const {
    url,
    withcCredentials = true,
    body,
    method = 'GET',
  } = config;

  const request = fetch(url, {
    credentials: withcCredentials === true ? 'include' : withcCredentials,
    body: JSON.stringify(body),
    method,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as T;
  })
  .catch((e: unknown): never => {
    if (typeof e === 'object' && e && 'message' in e && e.message === 'Unauthorized') {
      window.location.reload();
    }

    throw new Error('Something went wrong');
  });

  return request
};