/**
 * Represent an error received from API
 */
export class ApiError {
  constructor(errors) {
    this.errors = errors;
  }
}

/**
 *
 * @param {string} endpoint
 * @param {object} options
 */
export async function apiFetch(endpoint, options = {}) {
  const response = await fetch("http://localhost:3333/" + endpoint, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    ...options,
  });
  if (response.status === 204) {
    return null;
  }

  const responseData = await response.json();

  if (response.ok) {
    return responseData;
  } else {
    if (responseData.errors) {
      throw new ApiError(responseData.errors);
    }
  }
}
