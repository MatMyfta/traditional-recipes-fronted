<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let title = '';
	export let maxTime = ''; // Time input value (e.g., "07:00")

	const dispatch = createEventDispatcher();

	const timeOptions = [
		{ value: '00:15', label: '15 minutes' },
		{ value: '00:30', label: '30 minutes' },
		{ value: '00:45', label: '45 minutes' },
		{ value: '01:00', label: '1 hour' },
		{ value: '01:30', label: '1 hour 30 minutes' },
		{ value: '02:00', label: '2 hours' }
	];

	function applyFilters() {
		dispatch('apply', { title, maxTime });
	}

	function clearFilters() {
		title = ''; // Reset title input
		maxTime = ''; // Reset maxTime input
		dispatch('clear'); // Emit a clear event
		dispatch('apply', { title, maxTime });
	}
</script>

<div class="mb-8">
	<form on:submit|preventDefault={applyFilters} class="flex gap-2 align-bottom">
		<div class="flex flex-col items-start align-bottom">
			<label for="maxTime" class="block text-sm font-medium text-gray-700">Title</label>
			<input
				type="text"
				bind:value={title}
				placeholder="Search by title"
				class="w-full max-w-96 rounded-lg border border-gray-300 px-2 py-1 placeholder:text-gray-500 focus:outline-none focus:ring-2"
			/>
		</div>

		<div class="flex flex-col items-start align-bottom">
			<label for="maxTime" class="block text-sm font-medium text-gray-700">Max Time</label>
			<select
				id="maxTime"
				bind:value={maxTime}
				class="w-full max-w-40 rounded-lg border border-gray-300 px-2 py-1 placeholder:text-gray-500 focus:outline-none focus:ring-2"
			>
				<option value="">Select max time</option>
				{#each timeOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<div class="flex items-end">
			<button
				type="submit"
				class="w-auto rounded-lg border border-blue-500 bg-blue-500 px-2 py-1 text-white hover:border-blue-600 hover:bg-blue-600"
			>
				Filter
			</button>
		</div>

		<div class="flex items-end">
			<button
				type="button"
				on:click={clearFilters}
				class="w-auto rounded-lg border border-gray-500 bg-gray-500 px-2 py-1 text-white hover:border-gray-600 hover:bg-gray-600"
			>
				Clear
			</button>
		</div>
	</form>
</div>
