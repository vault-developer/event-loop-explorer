export interface StepInterface {
  sector: 'callstack' | 'task_queue' | 'microtask_queue' | 'console' | 'web_api';
  action: 'push' | 'pop';
  value: string | object | number;
}
