<script lang="ts">
	import { db } from '$lib/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { getID } from '$lib/utils';
	import { onMount } from 'svelte';

	let i1, i2;
	let color1, color2;

	onMount(async () => {
		changeColors();
	});

	async function changeColors() {
		i1 = getID();
		i2 = getID();

		while (i1 == i2) {
			i2 = getID();
		}

		let snap1 = await getDoc(doc(db, 'colors', i1.toString()));
		color1 = snap1.data();

		let snap2 = await getDoc(doc(db, 'colors', i2.toString()));
		color2 = snap2.data();
	}

	function vote(goodIndex: number) {
		const colors = [color1, color2];
		let badIndex;

		if (goodIndex == 0) badIndex = 1;
		else badIndex = 0;

		let goodColor = colors[goodIndex];
		goodColor.color = goodColor.color.replace('#', '');

		let badColor = colors[badIndex];
		badColor.color = badColor.color.replace('#', '');

		console.log(goodColor, badColor);
		setDoc(doc(db, 'colors', goodColor.color), {
			color: `#${goodColor.color}`,
			score: goodColor.score + 1
		});
		setDoc(doc(db, 'colors', badColor.color), {
			color: `#${badColor.color}`,
			score: badColor.score - 1
		});

		changeColors();
	}
</script>

<div class="container mt-5">
	{#if color1 && color2}
		<h1 class="text-center">Which color do you prefer?</h1>
		<div class="mx-auto my-auto grid grid-cols-2 gap-5">
			{#each [color1, color2] as color, i}
				<div>
					<div
						title={color.color}
						class="aspect-square rounded-2xl"
						style={`background-color: ${color.color}`}
						on:click={() => vote(i)}
					></div>
					<button on:click={() => vote(i)} class="mt-5 w-full">This one!</button>
				</div>
			{/each}
		</div>
		<a role="button" href="/scores" class="secondary mt-5 w-full">Scores</a>
	{/if}
</div>
