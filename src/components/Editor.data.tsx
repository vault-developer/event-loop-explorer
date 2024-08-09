export const codeExamples = [
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
}`
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
  }
];