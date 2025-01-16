import { get } from './utils';
import type { Recipe } from '$lib/types/Recipe';

/**
 * Fetch the list of recipes with optional filters and pagination
 * @param {Record<string, string>} filters - Optional query parameters for filtering
 * @param {number} page - Current page number (0-indexed)
 * @param {number} size - Number of recipes per page
 * @returns {Promise<{ recipes: Recipe[]; totalPages: number; totalElements: number }>}
 */
export async function fetchRecipes(
	filters?: Record<string, string>,
	page: number = 0,
	size: number = 10
): Promise<{
	recipes: Recipe[];
	totalPages: number;
	totalElements: number;
}> {
	// Pass filters and pagination parameters as query parameters
	const response = await get('/recipes/list', {
		...filters, // Spread filters (e.g., title, maxTime)
		page: page.toString(), // Add page number
		size: size.toString() // Add page size
	});

	// Extract recipes and pagination metadata
	return {
		recipes: response.content, // Array of recipes
		totalPages: response.totalPages, // Total number of pages
		totalElements: response.totalElements // Total number of recipes
	};
}

/**
 * Fetch a single recipe by ID
 * @param {number} id - The ID of the recipe
 * @returns {Promise<Recipe>} - The recipe details
 */
export async function fetchRecipeById(id: number): Promise<Recipe> {
	return await get(`/recipes/${id}`);
}
