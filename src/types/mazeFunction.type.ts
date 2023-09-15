import { Dispatch, SetStateAction } from 'react';
import { Cell } from '../helpers';

export type mazeFunction<T> = (
	field: Cell[][],
	setField: Dispatch<SetStateAction<Cell[][]>>,
	size: number,
	delay: number,
) => Promise<T>;
