import { Cell } from '.';

export const generateField = (size: number) => {
	const field: Cell[][] = new Array(size);

	for (let i = 0; i < size; i++) {
		field[i] = new Array(size);
		for (let j = 0; j < size; j++) {
			field[i][j] = new Cell(i, j);
		}
	}

	return field;
};
