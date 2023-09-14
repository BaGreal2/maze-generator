import { Cell } from '../../../helpers';
import styles from './MazeCell.module.css';

interface MazeCellProps {
	cell: Cell;
	size: number;
	delay: number;
}

const MazeCell = ({ cell, size, delay }: MazeCellProps) => {
	let stateStyles = ' ';
	let borderStyles = ' ';
	let beforeStyles = ' ';
	document.documentElement.style.setProperty('--cell-amount', size.toString());

	const noBordersStyles = [
		styles.noTopBorder,
		styles.noRightBorder,
		styles.noBottomBorder,
		styles.noLeftBorder,
	];

	for (let i = 0; i < cell.walls.length; i++) {
		if (!cell.walls[i]) {
			borderStyles += noBordersStyles[i] + ' ';
		}
	}

	if (cell.isVisited) {
		beforeStyles += styles.visited + ' ';
	}

	if (cell.isStart) {
		stateStyles += styles.start + ' ';
	}

	if (cell.isEnd) {
		stateStyles += styles.end + ' ';
	}

	if (cell.isShowing) {
		beforeStyles += styles.showing + ' ';
	}

	return (
		<>
			<div
				// style={{
				// 	width: 600 / size,
				// 	height: 600 / size,
				// }}
				className={styles.default + stateStyles + borderStyles}
			>
				<div
					style={{
						animationDuration: `${delay * 2.5 > 100 ? delay * 2.5 : 100}ms`,
					}}
					className={styles.beforeDefault + beforeStyles}
				></div>
			</div>
		</>
	);
};

export default MazeCell;
