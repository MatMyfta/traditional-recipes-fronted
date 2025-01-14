<script>
	export let recipe;
</script>

<!-- <a
	href={`/recipes/${recipe.id}`}
	class="block transform transition-transform hover:-translate-y-1 hover:shadow-lg"
> -->
<a
	href="#"
	class="block transform transition-transform hover:-translate-y-1 hover:shadow-lg"
>
	<div class="overflow-hidden rounded-lg bg-white shadow-md h-full">
        <div class="bg-gray-200 h-48 w-full">
            {#if recipe.img}
                <img src={recipe.image} alt={recipe.title} class="h-full w-full object-cover" />
            {/if}
        </div>
		<div class="p-4">
			<h2 class="mb-2 text-lg font-semibold">{recipe.title}</h2>
			<p class="text-sm text-gray-600">{recipe.description}</p>
		</div>
	</div>
</a>
