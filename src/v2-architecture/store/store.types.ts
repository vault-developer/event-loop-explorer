export interface Wheel {
	grad: number;
	render: boolean;
	task: boolean;
	microtask: boolean;
	setGrad(grad: number): void;
	setStop(stop: 'render' | 'task' | 'microtask', enabled: boolean): void;
}
