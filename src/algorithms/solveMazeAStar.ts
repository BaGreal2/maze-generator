import PriorityQueue from 'ts-priority-queue';
import { Cell, getNeighbors, getReachableNeighbors, sleep } from '../helpers';
import { mazeFunction } from '../types/mazeFunction.type';

const h = (cell1: Cell, cell2: Cell) =>
	Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y);

export const solveMazeAStar: mazeFunction<Cell[]> = async (
	field,
	setField,
	size,
	delay,
) => {
	const fieldCopy = [...field];
	const endCell = fieldCopy[size - 1][size - 1];
	const startCell = fieldCopy[0][0];
	const gScore: number[][] = [];
	for (let i = 0; i < field.length; i++) {
		gScore[i] = [];
		for (let j = 0; j < field[i].length; j++) {
			gScore[i][j] = Infinity;
		}
	}
	gScore[startCell.x][startCell.y] = 0;
	const fScore: number[][] = [];
	for (let i = 0; i < field.length; i++) {
		fScore[i] = [];
		for (let j = 0; j < field[i].length; j++) {
			fScore[i][j] = Infinity;
		}
	}
	fScore[startCell.x][startCell.y] = h(startCell, endCell);

	const open = new PriorityQueue<[number, number, Cell]>({
		comparator: (a, b) => {
			if (a[0] > b[0]) {
				return 1;
			} else if (a[0] < b[0]) {
				return -1;
			} else {
				if (a[1] > b[1]) {
					return 1;
				} else {
					return -1;
				}
			}
		},
	});
	open.queue([h(startCell, endCell), h(startCell, endCell), startCell]);
	const aPath: Cell[][] = new Array(size);

	for (let i = 0; i < size; i++) {
		aPath[i] = new Array(size);
	}

	while (open.length !== 0) {
		const currCell = open.dequeue()[2];
		currCell.setVisited();
		if (currCell.x === endCell.x && currCell.y === endCell.y) {
			break;
		}

		const allNeighbors = getNeighbors(currCell, size);
		const reachableNeighbors = getReachableNeighbors(
			fieldCopy,
			allNeighbors,
			currCell,
		);

		for (const neighbor of reachableNeighbors) {
			const tempGScore = gScore[currCell.x][currCell.y] + 1;
			const tempFScore = tempGScore + h(neighbor, endCell);

			if (tempFScore < fScore[neighbor.x][neighbor.y]) {
				gScore[neighbor.x][neighbor.y] = tempGScore;
				fScore[neighbor.x][neighbor.y] = tempFScore;
				open.queue([tempFScore, h(neighbor, endCell), neighbor]);
				aPath[neighbor.x][neighbor.y] = currCell;
			}
		}
		setField([...fieldCopy]);
		await sleep(delay);
	}

	const fwdPath: Cell[] = [];

	let cell = endCell;
	while (cell !== startCell) {
		fwdPath.unshift(cell);
		cell = aPath[cell.x][cell.y];
	}
	fwdPath.unshift(startCell);

	return fwdPath;
};
