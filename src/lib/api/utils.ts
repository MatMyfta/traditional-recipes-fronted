const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
	throw new Error('VITE_API_URL is not defined. Please check your .env file.');
}

/**
 * Utility function for making API requests with optional query parameters and body
 * @param {string} endpoint - The API endpoint (e.g., "/recipes")
 * @param {Record<string, string>} [queryParams] - Query parameters to append to the URL
 * @param {any} [body] - Optional body to send with the request (not standard in GET requests)
 * @returns {Promise<any>} - Parsed JSON response
 */
export async function get(endpoint: string, queryParams?: Record<string, string>): Promise<any> {
	let url = `${BASE_URL}${endpoint}`;

	// Add query parameters to the URL if provided
	if (queryParams) {
		const query = new URLSearchParams(queryParams).toString();
		url += `?${query}`;
	}

	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error ${response.status}: ${errorText}`);
		}

		return response.json();
	} catch (error) {
		console.error('Error during GET request:', error);
		throw error;
	}
}
