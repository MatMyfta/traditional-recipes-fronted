<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let currentPage: number = 0;
	export let totalPages: number = 1;

	const dispatch = createEventDispatcher();

	function goToPage(page: number) {
		if (page >= 0 && page < totalPages) {
			dispatch('change', { page });
			scrollToTop();
		}
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth' // Smooth scrolling effect
		});
	}
</script>

<div class="mt-4 flex items-center justify-between">
	<button
		on:click={() => goToPage(currentPage - 1)}
		class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:bg-gray-100"
		disabled={currentPage === 0}
	>
		Previous
	</button>

	<p class="text-sm">
		Page {currentPage + 1} of {totalPages}
	</p>

	<button
		on:click={() => goToPage(currentPage + 1)}
		class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:bg-gray-100"
		disabled={currentPage >= totalPages - 1}
	>
		Next
	</button>
</div>
