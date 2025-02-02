<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	import type { Map as LeafletMap, LayerGroup, Icon, LatLngExpression, Marker } from 'leaflet';

	export let location: LatLngExpression;
	export let shops: { name: string; lat: number; lng: number }[] = [];

	let map: LeafletMap | null = null;
	let mapElement: HTMLElement | null = null;
	let L: typeof import('leaflet') | null = null;
	let markerLayers: LayerGroup | null = null;
	let icon: Icon | null = null;

	async function start_map() {
		if (!browser) return;

		if (map) return;

		try {
			L = await import('leaflet');
			map = createMap(mapElement as HTMLElement);
			markerLayers = L.layerGroup();
			markerLayers.addTo(map);

			icon = L.icon({
				iconUrl: '/location.png',
				iconSize: [42, 42]
			});
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

	function createMarker(shop: { name: string; lat: number; lng: number }): Marker {
		return L!
			.marker([shop.lat, shop.lng], { icon: icon as Icon })
			.addTo(map as LeafletMap)
			.bindPopup(`<b>${shop.name}</b>`);
	}

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	function updateMarkers() {
		if (!map || !markerLayers || !L) return;

		markerLayers.clearLayers();

		shops.forEach((shop) => {
			const marker = createMarker(shop);
			markerLayers!.addLayer(marker);
		});
	}

	$: if (map && markerLayers && shops.length > 0) {
		updateMarkers();
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

<svelte:head>
	<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" on:load={start_map}></script>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>
</svelte:head>

<div class="mt-6 overflow-hidden rounded-md">
	<div id="leaflet-map" class="map" bind:this={mapElement}></div>
</div>

<style>
	#leaflet-map {
		width: 100%;
		height: 500px;
	}
</style>
