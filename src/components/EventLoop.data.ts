interface Event {
  title: string;
  type: 'task' | 'microtask' | 'render';
  degree: number;
}

export const events: Event[] = [
  {title: 'R', type: 'render', degree: 0},
  {title: 'T', type: 'task', degree: 180},
  {title: 'MT', type: 'microtask', degree: 330},
  {title: 'MT', type: 'microtask', degree: 210},
  {title: 'MT', type: 'microtask', degree: 150},
  {title: 'MT', type: 'microtask', degree: 30},
];