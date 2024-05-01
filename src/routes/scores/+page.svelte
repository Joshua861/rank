<script lang="ts">
	import { db } from '$lib/firebase';
	import { collection, limit, orderBy, query, getDocs, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let order: 'asc' | 'desc' = 'desc';
	let colors = [];

	async function loadMore() {
		try {
			const colorsCol = collection(db, 'colors');
			const q = query(colorsCol, orderBy('score', order), limit(4096), where('score', '!=', 0));
			const querySnapshot = await getDocs(q);

			let docs = [];

			querySnapshot.forEach((doc) => {
				docs.push(doc.data());
			});

			console.log(docs);
			colors = docs;
		} catch (error) {
			console.error('Error loading more colors:', error);
		}
	}

	onMount(() => {
		loadMore();
	});
</script>

<div class="container">
	{#if colors.length > 0}
		{#each colors as color}
			<div class="grid grid-cols-3">
				<div class="aspect-square" style="background-color: {color.color};"></div>
				<div class="my-auto text-center text-6xl font-bold">{color.score}</div>
				<div class="my-auto text-center text-6xl font-bold">{color.color}</div>
			</div>
		{/each}
	{:else}
		Loading...
	{/if}
</div>
