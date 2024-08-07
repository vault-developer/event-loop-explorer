import {EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../constants.ts";

interface Event {
  title: string;
  type: 'task' | 'microtask' | 'render';
  degree: number;
}

export const events: Event[] = [
  {title: 'R', type: 'render', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.render - 10)) % 360},
  {title: 'T', type: 'task', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.task - 10)) % 360},
  {title: 'MT', type: 'microtask', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[0] - 10)) % 360},
  {title: 'MT', type: 'microtask', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[1] - 10)) % 360},
  {title: 'MT', type: 'microtask', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[2] - 10)) % 360},
  {title: 'MT', type: 'microtask', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[3] - 10)) % 360},
];