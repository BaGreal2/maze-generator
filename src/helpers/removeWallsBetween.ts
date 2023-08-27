import Cell from '../components/MazeField/cell.class';

export const removeWallsBetween = (firstCell: Cell, secondCell: Cell) => {
	if (secondCell.x - firstCell.x === -1) {
		secondCell.removeWall('right');
		firstCell.removeWall('left');
	} else if (secondCell.x - firstCell.x === 1) {
		secondCell.removeWall('left');
		firstCell.removeWall('right');
	}
	if (secondCell.y - firstCell.y === -1) {
		secondCell.removeWall('bottom');
		firstCell.removeWall('top');
	} else if (secondCell.y - firstCell.y === 1) {
		secondCell.removeWall('top');
		firstCell.removeWall('bottom');
	}
};
