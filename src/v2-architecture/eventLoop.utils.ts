// Returns time before the closest stop
export const timeToNextStop = (arr: number[], current: number) => {
	return (arr.find(item => current < item) ?? Infinity) - current;
}
