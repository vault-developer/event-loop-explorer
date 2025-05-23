interface Example {
	title: string;
	code: string;
}

export const EXAMPLES: Record<string, Example> = {
	synchronous: {
		title: 'synchronous',
		code: `console.log(1);
console.log(2);
console.log(3);`,
	},
	tasksQueue: {
		title: 'tasks queue',
		code: `console.log(1);
setTimeout(()=>console.log(2), 0);
console.log(3);`,
	},
	callstack: {
		title: 'callstack',
		code: `function foo1() {
  console.log(1);
  foo2();
}
function foo2() {
  console.log(2);
  foo3();
}
function foo3() {
  setTimeout(()=>console.log(3), 800);
  console.log(4);
}
foo1();`,
	},
	microtasks: {
		title: 'microtasks',
		code: `console.log(1);
setTimeout(() => console.log(2), 0);
queueMicrotask(() => console.log(3));
Promise.resolve().then(() => {
    console.log(4);
});
setTimeout(() => console.log(5), 500);
console.log(6);`,
	},
	requestAnimationFrame: {
		title: 'requestAnimationFrame',
		code: `console.log(1);
queueMicrotask(() => console.log(2));
requestAnimationFrame(() => console.log(3));
requestAnimationFrame(() => console.log(4));
console.log(5);`,
	},
	everything: {
		title: 'everything',
		code: `function foo1() {
  console.log('foo1');
  foo2();
}
function foo2() {
  console.log('foo2');
  foo3();
}
function foo3() {
  setTimeout(() => {
      foo4();
      console.log('foo3:1');
  }, 0);
  queueMicrotask(() => console.log('foo3:2'));
  Promise.resolve().then(() => {
      console.log('foo3:3')
      });
  setTimeout(() => console.log('foo3:4'), 500);
  console.log('foo3:5');
}
function foo4() {
  console.log('foo4');
}

console.log('global');
setTimeout(() => console.log('global:1'), 500);
foo1();`,
	},
};

export const EXAMPLES_KEYS = Object.keys(EXAMPLES);
export const DEFAULT_EXAMPLE_KEY = EXAMPLES_KEYS[0];
