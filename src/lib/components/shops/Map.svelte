<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Geolocation from 'svelte-geolocation';

	import type { Map as LeafletMap, LayerGroup, Icon, LatLngExpression, Marker } from 'leaflet';

	export let location: LatLngExpression;

	import { shopsAPI } from '$lib/api';
	import type { Shop } from '$lib/types/Shop';

	let map: LeafletMap | null = null;
	let mapElement: HTMLElement | null = null;
	let L: typeof import('leaflet') | null = null;
	let markerLayers: LayerGroup | null = null;
	let shopIcon: Icon | null = null;
	let userIcon: Icon | null = null;
	let userMarker: Marker | null = null;

	let coords: [number, number] = [46.4983, 11.3548];
	let geolocationEnabled = false;
	let mode = 'default';

	let distance = 10;
	let distanceTimeout: ReturnType<typeof setTimeout> | null = null;

	async function start_map() {
		if (!browser) return;
		if (map) return;

		if (mapElement?._leaflet_id) {
			L!.map(mapElement).remove();
		}

		try {
			L = await import('leaflet');
			map = createMap(mapElement as HTMLElement);
			markerLayers = L.layerGroup();
			markerLayers.addTo(map);

			shopIcon = L.icon({
				iconUrl: '/location.png',
				iconSize: [30, 42]
			});

			userIcon = L.icon({
				iconUrl: '/location.png',
				iconSize: [30, 42]
			});

			updateUserMarker();
			updateShops();
		} catch (error) {
			console.error('Error initializing map:', error);
		}
	}

	function createMap(container: HTMLElement): LeafletMap {
		if (container._leaflet_id) {
			L!.map(container).remove();
		}
		try {
			const m = L!.map(container, { preferCanvas: true }).setView(location, 13);
			L!.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(m);

			return m;
		} catch (error) {
			console.error('Error creating map:', error);
			throw error;
		}
	}

	function createMarker(shop: Shop): Marker {
		const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${shop.coordinates.latitude},${shop.coordinates.longitude}`;

		return L!
			.marker([shop.coordinates.latitude, shop.coordinates.longitude], { icon: shopIcon as Icon })
			.addTo(map as LeafletMap)
			.bindPopup(
				`<p><b>${shop.title}</b></p>
             	<p>${shop.tags
								.split(',')
								.map(
									(tag) =>
										`<span class="tag mx-1 my-1 rounded-full bg-gray-200 px-2 py-1 inline-block">${tag.trim()}</span>`
								)
								.join('')}
             </p>
             <p><a href="${googleMapsLink}" target="_blank" class="text-blue-500 underline">Open in Google Maps</a></p>`
			);
	}

	async function updateShops() {
		if (!map || !L) return;

		try {
			const data = await shopsAPI.fetchShops(distance, coords[0], coords[1]);

			markerLayers?.clearLayers();

			data.shops.forEach((shop) => {
				markerLayers!.addLayer(createMarker(shop));
			});

			updateUserMarker();
		} catch (error) {
			console.error('Error updating shops:', error);
		}
	}

	function updateUserMarker() {
		if (!map || !L) return;

		if (userMarker) {
			map.removeLayer(userMarker);
		}

		userMarker = L.marker([coords[1], coords[0]], { icon: userIcon as Icon }).addTo(map);
	}

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	function handleModeChange(event: Event) {
		mode = (event.target as HTMLSelectElement).value;

		if (mode === 'gps') {
			geolocationEnabled = true;
		} else {
			geolocationEnabled = false;
			coords = [46.4983, 11.3548];
		}

		updateShops();
	}

	function handleDistanceChange(event: Event) {
		const newDistance = parseInt((event.target as HTMLInputElement).value);
		if (!isNaN(newDistance) && newDistance > 0) {
			distance = newDistance;

			if (distanceTimeout) clearTimeout(distanceTimeout);
			distanceTimeout = setTimeout(() => {
				updateShops();
			}, 500);
		}
	}

	$: if (map && L) {
		updateUserMarker();
		updateShops();
	}

	onDestroy(() => {
		try {
			if (browser && map) {
				map.remove();
				markerLayers?.clearLayers();
			}
		} catch (error) {
			console.error('Error cleaning up map:', error);
		}
	});

	onMount(start_map);
</script>

<svelte:window on:resize={resizeMap} />

{#if geolocationEnabled}
	<Geolocation getPosition bind:coords />
{/if}

<svelte:head>
	<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" on:load={start_map}></script>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>
</svelte:head>

<div class="mt-6 overflow-hidden rounded-md bg-white">
	<div class="flex items-center gap-8 px-2 py-4">
		<div class="input select">
			<label for="mode" class="mr-2 font-semibold">Location Mode:</label>
			<select id="mode" bind:value={mode} on:change={handleModeChange} class="rounded border p-2">
				<option value="default">Default</option>
				<option value="gps">GPS</option>
			</select>
		</div>
		<div class="input number">
			<label for="distance" class="mr-2 font-semibold">Distance (km):</label>
			<input
				class="rounded border p-2"
				type="number"
				name="distance"
				id="distance"
				bind:value={distance}
				on:input={handleDistanceChange}
			/>
		</div>
	</div>
	<div id="leaflet-map" class="map" bind:this={mapElement}></div>
</div>

<style>
	#leaflet-map {
		width: 100%;
		height: 500px;
	}
</style>
