import { Cell } from '.';
import Position from '../types/position.type';

export const getAccessableNeighbors = (
	field: Cell[][],
	allNeighborsPosition: Position[],
	currCell: Cell,
): Cell[] => {
	const accessableNeighbors: Cell[] = [];

	for (const position of allNeighborsPosition) {
		if (position.x - currCell.x === -1) {
			//left
			accessableNeighbors.push(field[position.x][position.y]);
		}
		if (position.x - currCell.x === 1) {
			//right
			accessableNeighbors.push(field[position.x][position.y]);
		}
		if (position.y - currCell.y === -1) {
			//top
			accessableNeighbors.push(field[position.x][position.y]);
		}
		if (position.y - currCell.y === 1) {
			//bottom
			accessableNeighbors.push(field[position.x][position.y]);
		}
	}

	return accessableNeighbors;
};
