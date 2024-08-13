export const codeExamples = [
  {
    title: 'test example 1',
    code: `console.log(1);`
  },
  {
    title: 'test example 2',
    code: `console.log(1, 2, 3);`
  },
  {
    title: 'test example 3',
    code: `console.log(() => 1);`
  },
  {
    title: 'tasks queue',
    code:
`console.log(1);
setTimeout(()=>console.log(2));
console.log(3);`
  },
  {
    title: 'call stack',
    code:
`function foo1() {
  console.log(1);
  foo2();
}
function foo2() {
  console.log(2);
  foo3();
}
function foo3() {
  setTimeout(()=>console.log(3), 2000);
  console.log(4);
}
foo1();`
  },
  {
    title: 'microtasks queue',
    code:
`console.log(1);  
setTimeout(() => console.log(2));  
queueMicrotask(() => console.log(3));  
Promise.resolve().then(() => console.log(4));  
setTimeout(() => console.log(5), 500);  
console.log(6);`
  },
  {
    title: 'microtasks + callstack',
    code:
`function foo1() {
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
  });  
  queueMicrotask(() => console.log('foo3:2'));  
  Promise.resolve().then(() => console.log('foo3:3'));  
  setTimeout(() => console.log('foo3:4'), 500);  
  console.log('foo3:5');
}
function foo4() {
  console.log('foo4');
}
function foo5(param1) {
  console.log(param1);
}

console.log('global');
setTimeout(() => console.log('global:1'), 500); 
foo1();
foo5('foo5:1');`
  }
];