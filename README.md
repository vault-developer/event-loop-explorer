# Event Loop Explorer

![license badge](https://img.shields.io/github/license/vault-developer/event-loop-explorer)
![issues badge](https://img.shields.io/github/issues/vault-developer/event-loop-explorer)
![prs badge](https://img.shields.io/github/issues-pr/vault-developer/event-loop-explorer)
![release badge](https://img.shields.io/github/v/release/vault-developer/event-loop-explorer)
![commit activity badge](https://img.shields.io/github/commit-activity/m/vault-developer/event-loop-explorer)

### About the project

Event Loop Explorer is a tool that helps to understand how JavaScript code is executed in the browser.
It visualizes the Call Stack, Web APIs, Tasks, Microtasks, and Render phase.

### Screenshots:

![event-loop](https://github.com/user-attachments/assets/42addaff-b64b-4236-9284-36b3dfb0b262)

### Demo:

Feel free to try it here: https://vault-developer.github.io/event-loop-explorer/

### Known limitations & simplifications:

- Javascript code is parsed to AST using acorn parser, and then order of events are generated.
  All default examples are working as expected, you can try to modify the code and see how it is working.
  However, not all cases are covered.
  Async/await, complex Promises, SetInterval, assignment operators will not work as expected.
- Render phase is usually triggered every 16.66ms (60fps), but in this project it is simplified to just every second Event Loop circle.
  We are counting every circle as 360ms for simplicity, so render phase is triggered every 720ms.
- UI is not mobile-friendly, please use desktop devices only.

### Contribution:

If you want to contribute, feel free to fork this repository and create a pull request.
There are a lot of topics in the "Future Plans" section.
Have a question or idea?
Feel free to raise it in our [discussions session](https://github.com/vault-developer/event-loop-explorer/discussions) 👍

### Launch locally:

```
git clone git@github.com:vault-developer/event-loop-explorer.git

cd event-loop-explorer

yarn install

yarn dev
```

### Future Plans:

- [ ] create a unified Icon component;
- [ ] handle todos in the codebase;
- [ ] add unit tests;
- [ ] check js parsing edge cases, including `new Promise((res) => {res(console.log(4))})`;
- [ ] replace window.confirm with error boundary
- [ ] add node.js event loop

### Inspired by:

- [JS visualiser by Andrew Dillon](https://www.jsv9000.app/)
- ["In The Loop" presented by Jake Archibald at JSConf.Asia 2018](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
