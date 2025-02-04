<script lang="ts">
	import RecipeCard from '$lib/components/recipes/RecipeCard.svelte';
	import Filter from '$lib/components/recipes/Filter.svelte';
	import Pagination from '$lib/components/recipes/Pagination.svelte';
	import type { Recipe } from '$lib/types/Recipe';

	import { recipesAPI } from '$lib/api';

	let recipes: Recipe[] = [];
	let title = '';
	let maxTime = '';
	let totalPages = 0;
	let currentPage = 0;
	const pageSize = 20;

	// Fetch data from API
	async function fetchRecipes(filters = {}, page = 0) {
		try {
			const response = await recipesAPI.fetchRecipes(filters, page, pageSize);
			recipes = response.recipes;
			totalPages = response.totalPages;
			currentPage = page;
		} catch (error) {
			console.error('Failed to fetch recipes:', error);
		}
	}

	function onApplyFilters(event: CustomEvent<{ title: string; maxTime: string }>) {
		const { title, maxTime } = event.detail;
		const filters = {
			...(title && { title }),
			...(maxTime && maxTime !== '00:00' && { maxTime })
		};
		fetchRecipes(filters);
	}

	function onPageChange(event: CustomEvent<{ page: number }>) {
		const { page } = event.detail;
		const filters = {
			...(title && { title }),
			...(maxTime && maxTime !== '00:00' && { maxTime })
		};
		fetchRecipes(filters, page);
	}

	fetchRecipes();
</script>

<div class="container mx-auto p-4">
	<Filter bind:title bind:maxTime on:apply={onApplyFilters} />
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each recipes as recipe}
			<RecipeCard {recipe} />
		{/each}
	</div>
	<Pagination {currentPage} {totalPages} on:change={onPageChange} />
</div>
