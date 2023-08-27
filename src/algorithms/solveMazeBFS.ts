import Cell from '../components/MazeField/cell.class';
import { getNeighbors, getReachableNeighbors, sleep } from '../helpers';
import { mazeFunction } from '../types/mazeFunction.type';

export const solveMazeBFS: mazeFunction<Cell[]> = async (
	field,
	setField,
	size,
	delay,
) => {
	const fieldCopy = [...field];
	const startCell = fieldCopy[0][0];
	const endCell = fieldCopy[size - 1][size - 1];
	const queue = [];
	const visited: Map<Cell, Cell | null> = new Map();
	let currCell = startCell;

	startCell.setVisited();
	visited.set(currCell, null);
	await sleep(delay);

	while (currCell !== endCell) {
		const allNeighborsPosition = getNeighbors(currCell, size);
		const reachableNeighbors = getReachableNeighbors(
			fieldCopy,
			allNeighborsPosition,
			currCell,
		);

		for (const neighbor of reachableNeighbors) {
			if (!neighbor.isVisited) {
				neighbor.setVisited();
				visited.set(neighbor, currCell);
				queue.push(neighbor);
			}
		}

		currCell = queue.shift()!;
		setField([...fieldCopy]);

		await sleep(delay);
	}
	const path = [];
	path.unshift(currCell);

	while (currCell !== startCell) {
		currCell = visited.get(currCell!)!;
		path.unshift(currCell!);
	}

	return path;
};
