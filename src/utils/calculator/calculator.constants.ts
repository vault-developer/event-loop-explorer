export const EVENT_LOOP_WHEEL_STOPS = {
	renders: [90],
	macrotasks: [270],
	microtasks: [60, 120, 240, 300],
};

export const EVENT_LOOP_WHEEL_STOPS_WITH_OVERLOAD = {
	macrotask: [270, 360 + 270],
	microtasks: [60, 120, 240, 300, 360 + 60],
};

export const LAST_RENDER_INITIAL_TIME = 90 - 360;
