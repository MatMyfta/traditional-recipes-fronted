const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL is not defined. Please check your .env file.');
}

/**
 * Utility function for making API requests
 * @param {string} endpoint - The API endpoint (e.g., "/recipes")
 * @param {Record<string, string>} [queryParams] - Query parameters to append to the URL
 * @returns {Promise<any>} - Parsed JSON response
 */
export async function get(endpoint: string, queryParams?: Record<string, string>): Promise<any> {
  let url = `${BASE_URL}${endpoint}`;
  
  // Add query parameters to the URL if provided
  if (queryParams) {
    const query = new URLSearchParams(queryParams).toString();
    url += `?${query}`;
  }


  try {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = response.json();

    return data;
  } catch (error) {
    console.error('Error during GET request:', error); // Log detailed errors
    throw error;
  }
}