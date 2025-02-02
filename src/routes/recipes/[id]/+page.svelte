<script lang="ts">
	import { page } from '$app/stores';
	import { recipesAPI } from '$lib/api';
	import type { Recipe } from '$lib/types/Recipe';
	import type { Shop } from '$lib/types/Shop';

	import Map from '$lib/components/shops/Map.svelte';

	let recipeId: string;
	let recipe: Recipe | null = null;
	let errorMessage: string | null = null;

	let shops: Shop[] = [
		{ name: 'Shop A', lat: 46.4983, lng: 11.3548 },
		{ name: 'Shop B', lat: 46.4907, lng: 11.3399 },
		{ name: 'Shop C', lat: 46.4753, lng: 11.3187 }
	];

	// Fetch data from API
	async function fetchRecipe(id: string) {
		try {
			recipe = await recipesAPI.fetchRecipeById(id);
		} catch (error) {
			console.error('Failed to fetch recipe:', error);
			errorMessage = 'Failed to fetch recipe. Please try again later.';
		}
	}

	$: recipeId = $page.params.id;
	$: if (recipeId) fetchRecipe(recipeId);
</script>

<div class="min-h-screen">
	<div class="overflow-hidden">
		<div class="container mx-auto my-12 max-w-screen-xl">
			<div class="p-8">
				<div class="mx-auto mb-8 max-w-screen-lg text-center">
					<h1 class="text-4xl font-bold">{recipe?.title}</h1>
				</div>

				<div class="rounded-md bg-white shadow-lg">
					<div class="grid grid-cols-1 gap-4 md:grid-cols-5">
						<div class="md:col-span-3">
							{#if recipe?.imgUrl}
								<img
									src={recipe.imgUrl}
									alt={recipe.title}
									class="h-full w-full rounded-md object-cover"
								/>
							{/if}
						</div>
						<div class="p-6 md:col-span-2">
							{#if recipe?.introText}
								<p class="mb-4 mt-2">{recipe?.introText}</p>
							{/if}
							<ul class="mb-8 flex flex-wrap gap-2">
								{#each recipe?.tags.split(',') ?? [] as tag}
									<li class="rounded-full bg-lime-300 px-3 py-1 text-sm text-lime-900">{tag}</li>
								{/each}
							</ul>
							<ul class="[&>li>strong]:text-lime-700">
								{#if recipe?.time}
									<li><strong>Preparation time</strong>: {recipe?.time}</li>
								{/if}
								{#if recipe?.people}
									<li><strong>Serves for</strong>: {recipe?.people} people</li>
								{/if}
							</ul>
						</div>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-1 gap-4 rounded-md bg-white md:grid-cols-5">
					<div class="rounded-md bg-gray-100 p-6 md:col-span-2">
						<div class="rounded-lg">
							<h2 class="mb-4 text-2xl font-semibold">Ingredients</h2>
							<ul class="[&>*]:py-2">
								{@html recipe?.ingredients}
							</ul>
						</div>
					</div>
					<div class="py-6 pe-4 md:col-span-3">
						<h2 class="mb-4 text-3xl font-bold">Preparation</h2>
						<div class="text-lg [&>*]:my-4">
							{@html recipe?.preparation}
						</div>
					</div>
				</div>

				<Map location={[46.4983, 11.3548]} {shops} />
			</div>
		</div>
	</div>
</div>
