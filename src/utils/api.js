/**
 * Represent an error received from API
 */
export class ApiError {
  constructor(errors) {
    this.errors = errors;
  }

  get errorPerField() {
    return this.errors.reduce((acc, error) => {
      acc[error.field] = error.message;
      return acc
    }, {})
  }
}

/**
 *
 * @param {string} endpoint
 * @param {object} options
 */
export async function apiFetch(endpoint, options = {}, headers = {}) {
  const response = await fetch("http://localhost:3333/" + endpoint, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...headers
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
