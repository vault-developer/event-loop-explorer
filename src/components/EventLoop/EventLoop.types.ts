export interface EventInterface {
  title: string;
  type: 'task' | 'microtask' | 'render';
  degree: number;
}