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
	const response = await get('/recipes/list', {
		...filters,
		page: page.toString(),
		size: size.toString()
	});

	return {
		recipes: response.content,
		totalPages: response.totalPages,
		totalElements: response.totalElements
	};
}

/**
 * Fetch a single recipe by ID
 * @param {string} id - The ID of the recipe
 * @returns {Promise<Recipe>} - The recipe details
 */
export async function fetchRecipeById(id: string): Promise<Recipe> {
	return await get(`/recipes/get/${id}`);
}
