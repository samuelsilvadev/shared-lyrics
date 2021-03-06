export const toJson = (response: Response) => response.json();

export const abstractedFetch = (endpoint: string, options?: RequestInit) =>
  fetch(`${process.env.SERVICE_URL}/${endpoint}`, options).then(toJson);

export const abstractedPost = (
  endpoint: string,
  body: Record<string, string | number | boolean>
) =>
  abstractedFetch(endpoint, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

export const abstractedDelete = (endpoint: string, id: string) =>
  abstractedFetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });

export const abstractedPatch = (
  endpoint: string,
  id: string,
  body: Record<string, string | number | boolean>
) =>
  abstractedFetch(`${endpoint}/${id}`, {
    body: JSON.stringify(body),
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
  });
