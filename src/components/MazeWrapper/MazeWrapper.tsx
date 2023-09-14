import { useEffect, useState } from 'react';
import { Cell, generateField, sleep } from '../../helpers';
import { mazeFunction } from '../../types/mazeFunction.type';
import Controls from '../Controls/Controls';
import MazeField from '../MazeField/MazeField';
import styles from './MazeWrapper.module.css';

const MazeWrapper = () => {
	const [size, setSize] = useState(20);
	const [delay, setDelay] = useState(1);

	const startField = generateField(size);
	const [field, setField] = useState<Cell[][]>(startField);

	useEffect(() => {
		const newField = generateField(size);

		for (let i = 0; i < size; i++) {
			newField[i] = new Array(size);
			for (let j = 0; j < size; j++) {
				newField[i][j] = new Cell(i, j);
			}
		}

		setField(newField);
	}, [size]);

	const unvisitAllCells = () => {
		const fieldCopy = [...field];
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				fieldCopy[i][j].setUnvisited();
			}
		}
		setField([...fieldCopy]);
	};
	const unshowAllCells = () => {
		const fieldCopy = [...field];
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				fieldCopy[i][j].setUnshowing();
			}
		}
		setField([...fieldCopy]);
	};

	const setStartAndEnd = () => {
		const fieldCopy = [...field];
		fieldCopy[0][0].setStart();
		fieldCopy[size - 1][size - 1].setEnd();
		setField([...fieldCopy]);
	};

	const showPath = async (path: Cell[]) => {
		for (const cell of path) {
			cell.setShowing();
			await sleep(delay);
			setField([...field]);
		}
	};

	const onCreateMaze = (mazeGenerationFunction: mazeFunction<void>) => {
		return async () => {
			onClearField()();
			await mazeGenerationFunction(field, setField, size, delay);
			unvisitAllCells();
			setStartAndEnd();
		};
	};

	const onSolveMaze = (mazeSolvingFunction: mazeFunction<Cell[]>) => {
		return async () => {
			unvisitAllCells();
			unshowAllCells();
			const path = await mazeSolvingFunction(field, setField, size, delay);
			await showPath(path);
		};
	};

	const onClearField = () => {
		return () => {
			const fieldCopy = [...field];
			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size; j++) {
					fieldCopy[i][j].reset();
				}
			}
			setField([...fieldCopy]);
		};
	};
	return (
		<div className={styles.mazeWrapper}>
			<Controls
				size={size}
				setSize={setSize}
				delay={delay}
				setDelay={setDelay}
				onCreateMaze={onCreateMaze}
				onSolveMaze={onSolveMaze}
				onClearField={onClearField}
			/>
			<MazeField size={size} delay={delay} field={field} />
		</div>
	);
};

export default MazeWrapper;
