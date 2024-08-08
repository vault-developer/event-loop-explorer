import {EventInterface} from "./EventLoop.types.ts";

export const events: EventInterface[] = [
  {title: 'R', type: 'render', degree: 0},
  {title: 'T', type: 'task', degree: 180},
  {title: 'mT', type: 'microtask', degree: 330},
  {title: 'mT', type: 'microtask', degree: 210},
  {title: 'mT', type: 'microtask', degree: 150},
  {title: 'mT', type: 'microtask', degree: 30},
];