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

![event-loop-image-1](https://github.com/user-attachments/assets/72b9efe9-1480-49a0-88d5-5c31461a4276)
![event-loop-image-2](https://github.com/user-attachments/assets/b6dccbd4-58a0-44ce-a6be-73bbd549b84e)

### Demo:

Feel free to try it here: https://event-loop-explorer.vercel.app/

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

npm install

npm run dev
```

### Future Plans:

- [ ] handle todos in the codebase;
- [ ] check js parsing edge cases, including `new Promise((res) => {res(console.log(4))})`;
- [ ] replace window.confirm with error boundary
- [ ] add progress percentage inside wheel
- [ ] add node.js event loop

### Inspired by:

- [JS visualiser by Andrew Dillon](https://www.jsv9000.app/)
- ["In The Loop" presented by Jake Archibald at JSConf.Asia 2018](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
