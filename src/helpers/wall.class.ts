import Cell from '../components/MazeField/cell.class';

export class Wall {
	constructor(
		public firstCell: Cell,
		public secondCell: Cell,
	) {
		this.firstCell = firstCell;
		this.secondCell = secondCell;
	}

	public remove() {
		if (this.firstCell.x - this.secondCell.x === -1) {
			this.firstCell.removeWall('right');
			this.secondCell.removeWall('left');
		} else if (this.firstCell.x - this.secondCell.x === 1) {
			this.firstCell.removeWall('right');
			this.secondCell.removeWall('left');
		}
		if (this.firstCell.y - this.secondCell.y === -1) {
			this.firstCell.removeWall('bottom');
			this.secondCell.removeWall('top');
		} else if (this.firstCell.y - this.secondCell.y === 1) {
			this.firstCell.removeWall('top');
			this.secondCell.removeWall('bottom');
		}
	}
}
