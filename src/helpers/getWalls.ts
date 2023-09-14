import { Cell, Wall, getAccessableNeighbors, getNeighbors } from '.';

export const getWalls = (field: Cell[][], size: number): Wall[] => {
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
