export const toJson = (response: Response) => response.json();

export const abstractedFetch = (endpoint: string, options?: RequestInit) =>
  fetch(`${process.env.SERVICE_URL}/${endpoint}`, options).then(toJson);
