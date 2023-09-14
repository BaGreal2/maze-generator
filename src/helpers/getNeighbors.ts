import { Cell } from '.';

export const getNeighbors = (currCell: Cell, size: number) => {
	const res = [];
	const deltas = [
		{ x: -1, y: 0 },
		{ x: 0, y: 1 },
		{ x: 1, y: 0 },
		{ x: 0, y: -1 },
	];

	for (const delta of deltas) {
		const neighborX: number = currCell.x + delta.x;
		const neighborY: number = currCell.y + delta.y;

		if (
			0 <= neighborX &&
			neighborX < size &&
			0 <= neighborY &&
			neighborY < size
		) {
			res.push({ x: neighborX, y: neighborY });
		}
	}

	return res;
};
