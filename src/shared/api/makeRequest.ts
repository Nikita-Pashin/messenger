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
  .then<T>((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  })
  .catch((e: unknown): never => {
    console.error(e);

    if (typeof e === 'object' && e && 'message' in e && e.message === 'Unauthorized') {
      window.location.reload();
    }

    if (typeof e === 'object' && e && 'message' in e && typeof e.message === 'string') {
      throw new Error(e.message);
    }
    
    throw new Error('Something went wrong');
  });

  return request
};