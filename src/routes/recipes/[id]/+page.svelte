<script>
	import { page } from '$app/stores';
	let recipeId;

	let recipe = {
		id: '',
		title: 'Shakshuka (Scrambled Eggs in Tomato Sauce)',
		description: 'Classic Middle-Eastern breakfast dish',
		image: null,
		prepTime: '10 min',
		cookTime: '30 min',
		totalTime: '40 min',
		portions: 4,
		ingredients: [
			'5 eggs',
			'500g chopped tomatoes',
			'1 red pepper',
			'1 onion',
			'2 garlic cloves',
			'1 tbsp tomato paste',
			'1 tbsp olive oil',
			'Salt and pepper to taste'
		],
		directions: [
			'Peel the onion and chop finely.',
			'Heat the pan and sauté the onions with olive oil.',
			'Add tomatoes and bring to a simmer for 20 minutes.',
			'Crack the eggs into the mixture and cook until set.'
		],
		nutrition: { calories: 492, protein: 17, fat: 21, carbs: 12 }
	};

	$: recipeId = $page.params.id;
	$: recipe.id = recipeId;
</script>

<div class="min-h-screen">
	<div class="overflow-hidden">
		<div class="relative">
			<div class="bg-gray-200 w-full h-64 sm:h-80 md:h-96">
				{#if recipe.image}
					<img src={recipe.image} alt={recipe.title} class="h-full w-full object-cover" />
				{/if}
			</div>
			<div
				class="absolute bottom-0 left-0 right-0 top-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-6"
			>
				<div class="text-white">
					<h1 class="text-4xl font-bold">{recipe.title}</h1>
					<p class="mt-2 text-lg">{recipe.description}</p>
					<p class="mt-1 text-sm">Recipe ID: <strong>{recipeId}</strong></p>
				</div>
			</div>
		</div>

        <div class="container mx-auto shadow-lg my-12 bg-white">
            <div class="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
                <div class="rounded-lg p-6">
                    <h2 class="mb-4 text-2xl font-semibold">Cooking Info</h2>
                    <ul class="space-y-2">
                        <li><strong>Prep Time:</strong> {recipe.prepTime}</li>
                        <li><strong>Cook Time:</strong> {recipe.cookTime}</li>
                        <li><strong>Total Time:</strong> {recipe.totalTime}</li>
                        <li><strong>Portions:</strong> Serves {recipe.portions}</li>
                    </ul>
                    <h2 class="mt-6 text-2xl font-semibold">Nutrition Facts</h2>
                    <p class="mt-2 text-sm">
                        <strong>{recipe.nutrition.calories} kcal</strong> - {recipe.nutrition.protein}g protein, {recipe
                            .nutrition.fat}g fat, {recipe.nutrition.carbs}g carbs.
                    </p>
                </div>
    
                <div class="rounded-lg bg-gray-100 p-6">
                    <h2 class="mb-4 text-2xl font-semibold">Ingredients</h2>
                    <ul class="list-inside list-disc space-y-1">
                        {#each recipe.ingredients as ingredient}
                            <li class="">{ingredient}</li>
                        {/each}
                    </ul>
                </div>
            </div>
    
            <div class="mt-8 rounded-lg p-8 shadow-md">
                <h2 class="mb-6 text-3xl font-bold">Directions</h2>
                <div class="space-y-6">
                    {#each recipe.directions as direction, index}
                        <div class="rounded-lg bg-gray-100 p-4 shadow-sm">
                            <h3 class="mb-2 text-xl font-semibold">Step {index + 1}</h3>
                            <p class="">{direction}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
	</div>
</div>
