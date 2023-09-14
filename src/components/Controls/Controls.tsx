import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
	generateMazeDFS,
	generateMazeKruskal,
	solveMazeAStar,
	solveMazeBFS,
} from '../../algorithms';
import ExpandMoreIcon from '../../assets/icons/expand_more_FILL0_wght400_GRAD0_opsz24.svg';
import { mazeFunction } from '../../types/mazeFunction.type';
import Cell from '../MazeField/cell.class';
import styles from './Controls.module.css';

interface ControlsProps {
	size: number;
	setSize: Dispatch<SetStateAction<number>>;
	delay: number;
	setDelay: Dispatch<SetStateAction<number>>;
	onCreateMaze: (func: mazeFunction<void>) => () => void;
	onSolveMaze: (func: mazeFunction<Cell[]>) => () => void;
	onClearField: () => () => void;
}

const Controls = ({
	size,
	setSize,
	delay,
	setDelay,
	onCreateMaze,
	onSolveMaze,
	onClearField,
}: ControlsProps) => {
	const [isGenerateDropodownOpen, setGenerateDropdownOpen] = useState(false);
	const [isSolveDropodownOpen, setSolveDropdownOpen] = useState(false);
	const [currGenerationAlgorithmIndex, setCurrGenerationAlgorithmIndex] =
		useState(0);
	const [currSolvingAlgorithmIndex, setCurrSolvingAlgorithmIndex] = useState(0);

	const generationAlgorithms = [
		{ function: generateMazeDFS, name: 'DFS', index: 0 },
		{ function: generateMazeKruskal, name: 'Kruskal', index: 1 },
	];
	const solvingAlgorithms = [
		{ function: solveMazeBFS, name: 'BFS', index: 0 },
		{ function: solveMazeAStar, name: 'A*', index: 1 },
	];

	const onSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setSize(Number(event.target.value));
	};

	const onDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setDelay(Number(event.target.value));
	};

	const onToggleDropdown = (
		toggleFunction: Dispatch<SetStateAction<boolean>>,
	) => {
		return () => {
			toggleFunction((prev) => !prev);
		};
	};
	return (
		<div className={styles.controlsWrapper}>
			<div className={styles.fieldControls}>
				<div className={styles.buttonWrapper}>
					<div className={styles.currentAlgorithm}>
						{generationAlgorithms[currGenerationAlgorithmIndex].name}
					</div>
					<button
						className={styles.fieldControlButton}
						onClick={onCreateMaze(
							generationAlgorithms[currGenerationAlgorithmIndex].function,
						)}
					>
						Generate
					</button>
					<div
						className={styles.buttonDropdown}
						onClick={onToggleDropdown(setGenerateDropdownOpen)}
					>
						<img
							className={styles.expandMore}
							src={ExpandMoreIcon}
							alt="Exapnd More"
						/>
					</div>
					<div
						className={`${styles.dropdown} ${
							isGenerateDropodownOpen ? styles.show : ''
						}`}
					>
						{generationAlgorithms.map((algorithm, i) => (
							<div
								className={styles.dropdownItem}
								onClick={() => setCurrGenerationAlgorithmIndex(algorithm.index)}
								key={i}
							>
								{algorithm.name}
							</div>
						))}
					</div>
				</div>
				<div className={styles.buttonWrapper}>
					<div className={styles.currentAlgorithm}>
						{solvingAlgorithms[currSolvingAlgorithmIndex].name}
					</div>
					<button
						className={styles.fieldControlButton}
						onClick={onSolveMaze(
							solvingAlgorithms[currSolvingAlgorithmIndex].function,
						)}
					>
						Solve
					</button>
					<div
						className={styles.buttonDropdown}
						onClick={onToggleDropdown(setSolveDropdownOpen)}
					>
						<img
							className={styles.expandMore}
							src={ExpandMoreIcon}
							alt="Exapnd More"
						/>
					</div>
					<div
						className={`${styles.dropdown} ${
							isSolveDropodownOpen ? styles.show : ''
						}`}
					>
						{solvingAlgorithms.map((algorithm, i) => (
							<div
								className={styles.dropdownItem}
								onClick={() => setCurrSolvingAlgorithmIndex(algorithm.index)}
								key={i}
							>
								{algorithm.name}
							</div>
						))}
					</div>
				</div>
				<div className={styles.buttonWrapper}>
					<button
						className={`${styles.fieldControlButton} ${styles.clearButton}`}
						onClick={onClearField()}
					>
						Clear
					</button>
				</div>
			</div>

			<div className={styles.numberControls}>
				<input
					className={styles.numberInput}
					type="number"
					min={2}
					max={60}
					value={size}
					onChange={onSizeChange}
				/>
				<input
					className={styles.numberInput}
					type="number"
					min={1}
					max={1000}
					value={delay}
					onChange={onDelayChange}
				/>
			</div>
		</div>
	);
};

export default Controls;
