export function getRandomIndex<T>(array: T[]): number {
	return Math.floor(Math.random() * array.length);
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
