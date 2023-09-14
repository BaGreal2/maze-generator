import { Cell } from '.';
import Position from '../types/position.type';

export const getReachableNeighbors = (
	field: Cell[][],
	allNeighborsPosition: Position[],
	currCell: Cell,
): Cell[] => {
	const reachableNeighbors = [];

	for (const position of allNeighborsPosition) {
		if (position.x - currCell.x === -1 && !currCell.walls[3]) {
			//left
			reachableNeighbors.push(field[position.x][position.y]);
		}
		if (position.x - currCell.x === 1 && !currCell.walls[1]) {
			//right
			reachableNeighbors.push(field[position.x][position.y]);
		}
		if (position.y - currCell.y === -1 && !currCell.walls[0]) {
			//top
			reachableNeighbors.push(field[position.x][position.y]);
		}
		if (position.y - currCell.y === 1 && !currCell.walls[2]) {
			//bottom
			reachableNeighbors.push(field[position.x][position.y]);
		}
	}

	return reachableNeighbors;
};
