import { Cell, getShuffledArray, getWalls, sleep } from '../helpers';
import { mazeFunction } from '../types/mazeFunction.type';

const mergeSets = (set1: Set<Cell>, set2: Set<Cell>) => {
	for (const cell of set2) {
		set1.add(cell);
	}
};

const findSetContainingCell = (
	cell: Cell,
	cellSets: Set<Cell>[],
): Set<Cell> | null => {
	for (const cellSet of cellSets) {
		if (cellSet.has(cell)) {
			return cellSet;
		}
	}
	return null;
};

export const generateMazeKruskal: mazeFunction<void> = async (
	field,
	setField,
	size,
	delay,
) => {
	const fieldCopy = [...field];
	let walls = getWalls(fieldCopy, size);
	const cellSets: Set<Cell>[] = [];

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const cell = field[i][j];
			const cellSet = new Set<Cell>();
			cellSet.add(cell);
			cellSets.push(cellSet);
		}
	}

	walls = getShuffledArray(walls);
	for (const wall of walls) {
		const firstSet = findSetContainingCell(wall.firstCell, cellSets)!;
		const secondSet = findSetContainingCell(wall.secondCell, cellSets)!;
		if (firstSet !== secondSet) {
			mergeSets(firstSet, secondSet);
			wall.remove();
		}
		setField([...fieldCopy]);
		await sleep(delay);
	}
};
