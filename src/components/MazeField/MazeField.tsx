import MazeCell from './MazeCell';
import styles from './MazeField.module.css';
import Cell from './cell.class';

interface MazeFieldProps {
	size: number;
	delay: number;
	field: Cell[][];
}

const MazeField = ({ size, delay, field }: MazeFieldProps) => {
	return (
		<>
			<div className={styles.field}>
				{field.map((cellsRow, rowIndex) =>
					cellsRow.map((cell, colIndex) => (
						<MazeCell
							key={(rowIndex + 1) * (colIndex + 1)}
							cell={cell}
							size={size}
							delay={delay}
						/>
					)),
				)}
			</div>
		</>
	);
};

export default MazeField;
