import Position from '../types/position.type';

export class Cell {
	private _isVisited: boolean;
	private _isStart: boolean;
	private _isEnd: boolean;
	private _isShowing: boolean;
	private _walls: [boolean, boolean, boolean, boolean];
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this._isVisited = false;
		this._isStart = false;
		this._isEnd = false;
		this._isShowing = false;
		this._walls = [true, true, true, true];
		this.x = x;
		this.y = y;
	}

	public removeWall(wall: 'top' | 'right' | 'bottom' | 'left') {
		switch (wall) {
			case 'top':
				this._walls[0] = false;
				break;
			case 'right':
				this._walls[1] = false;
				break;
			case 'bottom':
				this._walls[2] = false;
				break;
			case 'left':
				this._walls[3] = false;
				break;
			default:
				break;
		}
	}

	public setVisited() {
		this._isVisited = true;
	}

	public setUnvisited() {
		this._isVisited = false;
	}

	public setStart() {
		this._isEnd = false;
		this._isStart = true;
	}

	public setEnd() {
		this._isStart = false;
		this._isEnd = true;
	}

	public setShowing() {
		this._isShowing = true;
	}
	public setUnshowing() {
		this._isShowing = false;
	}

	public get isVisited() {
		return this._isVisited;
	}

	public get isEnd() {
		return this._isEnd;
	}

	public get isStart() {
		return this._isStart;
	}

	public get isShowing() {
		return this._isShowing;
	}

	public get walls() {
		return this._walls;
	}

	public hasUnvisitedNeighbor(neighborsPosition: Position[], field: Cell[][]) {
		for (const position of neighborsPosition) {
			if (!field[position.x][position.y].isVisited) {
				return true;
			}
		}
		return false;
	}

	public reset() {
		this._isEnd = false;
		this._isStart = false;
		this._isVisited = false;
		this._isShowing = false;
		this._walls = [true, true, true, true];
	}
}
