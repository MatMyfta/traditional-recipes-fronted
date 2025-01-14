<script>
	import RecipeCard from '$lib/components/recipes/RecipeCard.svelte';

	let recipes = [
		{
			id: '1',
			title: 'Spaghetti Carbonara',
			description: 'A classic Italian pasta dish with egg, cheese, pancetta, and pepper.',
			image: null
		},
		{
			id: '2',
			title: 'Tiramisu',
			description: 'A delicious coffee-flavored dessert.',
			image: null
		},
		{
			id: '2',
			title: 'Spaghetti Carbonara',
			description: 'A classic Italian pasta dish with egg, cheese, pancetta, and pepper.',
			image: null
		},
		{
			id: '3',
			title: 'Tiramisu',
			description: 'A delicious coffee-flavored dessert.',
			image: null
		},
		{
			id: '4',
			title: 'Spaghetti Carbonara',
			description: 'A classic Italian pasta dish with egg, cheese, pancetta, and pepper.',
			image: null
		},
		{
			id: '5',
			title: 'Tiramisu',
			description: 'A delicious coffee-flavored dessert.',
			image: null
		},
	];

    function getAllItems() {
        return recipes;
    }

    // TODO: attach to a REST API service
	async function fetchRecipes() {
		try {
			recipes = getAllItems();
		} catch (err) {
			console.error('Failed to load recipes:', err);
		}
	}

	fetchRecipes();
</script>

<h1 class="my-8 text-center text-3xl font-bold">Traditional Recipes</h1>

<div class="container mx-auto p-4">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each recipes as recipe}
			<RecipeCard {recipe} />
		{/each}
	</div>
</div>
