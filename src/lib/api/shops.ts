import { get } from './utils';
import type { Shop } from '$lib/types/Shop';

/**
 * Fetch shops using a GET request by converting the request body into query parameters
 * @param {number} [page=0] - Page number for pagination
 * @param {number} [size=10] - Number of items per page
 * @param {Record<string, any>} body - Request body (converted into query parameters)
 * @returns {Promise<{ shops: Shop[]; totalPages: number; totalElements: number }>}
 */
export async function fetchShops(
	distance: number = 20,
	latitude: number = 46.4983,
	longitude: number = 11.3548,
): Promise<{
	shops: Shop[];
	totalPages: number;
	totalElements: number;
}> {
	// Convert body to query parameters
	const queryParams: Record<string, string> = {
		distance: distance.toString(),
		latitude: latitude.toString(),
		longitude: longitude.toString(),
	};

	const response = await get('/shops/find', queryParams);

	return {
		shops: response.content,
		totalPages: response.totalPages,
		totalElements: response.totalElements
	};
}
