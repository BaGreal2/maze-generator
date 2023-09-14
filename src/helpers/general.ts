export function getRandomIndex<T>(array: T[]): number {
	return Math.floor(Math.random() * array.length);
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function getShuffledArray<T>(array: T[]): T[] {
	const arrayCopy = [...array];
	for (let i = arrayCopy.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));

		const temp = arrayCopy[i];
		arrayCopy[i] = arrayCopy[randomIndex];
		arrayCopy[randomIndex] = temp;
	}
	return arrayCopy;
}
