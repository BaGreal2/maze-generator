import Cell from '../components/MazeField/cell.class';
import { Wall, getAccessableNeighbors, getNeighbors, sleep } from '../helpers';
import { mazeFunction } from '../types/mazeFunction.type';

const getWalls = (field: Cell[][], size: number): Wall[] => {
	const walls = [];
	const visited: Cell[] = [];
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			visited.push(field[i][j]);
			const allNeighbors = getNeighbors(field[i][j], size);
			const accessableNeighbors = getAccessableNeighbors(
				field,
				allNeighbors,
				field[i][j],
			);

			for (const neighbor of accessableNeighbors) {
				if (visited.includes(neighbor)) {
					continue;
				}
				walls.push(new Wall(field[i][j], neighbor));
			}
		}
	}
	return walls;
};

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

function shuffleArray<T>(array: T[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));

		const temp = array[i];
		array[i] = array[randomIndex];
		array[randomIndex] = temp;
	}
}

export const generateMazeKruskal: mazeFunction<void> = async (
	field,
	setField,
	size,
	delay,
) => {
	const fieldCopy = [...field];
	const walls = getWalls(fieldCopy, size);
	const cellSets: Set<Cell>[] = [];

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const cell = field[i][j];
			const cellSet = new Set<Cell>();
			cellSet.add(cell);
			cellSets.push(cellSet);
		}
	}

	shuffleArray(walls);
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
