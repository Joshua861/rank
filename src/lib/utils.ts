export function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}
export function getID() {
	const r = getRandomInt(16);
	const g = getRandomInt(16);
	const b = getRandomInt(16);

	return `${r.toString(16).toUpperCase()}${g.toString(16).toUpperCase()}${b.toString(16).toUpperCase()}`;
}
