import {
	Cell,
	getNeighbors,
	getRandomIndex,
	removeWallsBetween,
	sleep,
} from '../helpers';
import { mazeFunction } from '../types/mazeFunction.type';

export const generateMazeDFS: mazeFunction<void> = async (
	field,
	setField,
	size,
	delay,
) => {
	const fieldCopy: Cell[][] = [...field];

	const innerRecursion = async (currCell: Cell) => {
		currCell.setVisited();
		const neighbors = getNeighbors(currCell, size);

		while (currCell.hasUnvisitedNeighbor(neighbors, fieldCopy)) {
			const randomIndex = getRandomIndex(neighbors);
			const randomNeighborCoordinates = neighbors[randomIndex];
			const randomNeighbor =
				fieldCopy[randomNeighborCoordinates.x][randomNeighborCoordinates.y];

			if (randomNeighbor.isVisited) {
				continue;
			}

			removeWallsBetween(currCell, randomNeighbor);
			setField([...fieldCopy]);

			await sleep(delay);
			await innerRecursion(randomNeighbor);
		}
	};

	await innerRecursion(fieldCopy[0][0]);
};
