export default interface ICell {
	state: string;
	isStart: boolean;
	isEnd: boolean;
	walls: [boolean, boolean, boolean, boolean];
}
