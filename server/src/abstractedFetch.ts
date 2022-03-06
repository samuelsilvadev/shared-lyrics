export const toJson = (response: Response) => response.json();

export const abstractedFetch = (endpoint: string) =>
  fetch(`${process.env.SERVICE_URL}/${endpoint}`).then(toJson);
