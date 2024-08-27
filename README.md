# Event Loop Explorer

### About the project

Event Loop Explorer is a tool that helps to understand how JavaScript code is executed in the browser.
It visualizes the Call Stack, Web APIs, Tasks, Microtasks, and Render phase.

### Screenshots:
![event-loop-screenshot](https://github.com/user-attachments/assets/bf81c764-f96a-41ec-b5f8-68e014074a7f)

### Known limitations & simplifications:

- Javascript code is parsed to AST using acorn parser, and then order of events are generated.
  All default examples are working as expected, you can try to modify the code and see how it is working.
  However, not all cases are covered.
  Async/await, complex Promises, SetInterval, assignment operators will not work as expected.
- Render phase is usually triggered every 16.66ms (60fps), but in this project it is simplified to just every second Event Loop circle.
  We are counting every circle as 360ms for simplicity, so render phase is triggered every 720ms.

### Contribution:

If you want to contribute, feel free to fork this repository and create a pull request.
There are a lot of ideas in "Future Plans" section.
I would be happy to consider any other ideas and improvements - just reach out to me.

### Future Plans:

- [ ] add badges to the readme;
- [ ] deploy to gh-pages or vercel;
- [ ] clean up the code, remove todos;
- [ ] highlight debug line in editor;
- [ ] add [code validation syntax](https://github.com/ajaxorg/ace/wiki/Syntax-validation);
- [ ] add unit tests;
- [ ] add possibility to pause execution;
- [ ] replace styled components with emotion;
- [ ] add gamification (achievements);
- [ ] check js parsing edge cases;
- [ ] add animation for lists & queues;
- [ ] add (animated?) pictures to all modals;
- [ ] add animation inside event loop circle.

### Inspired by:

- [JS visualiser by Andrew Dillon](https://www.jsv9000.app/)
- ["In The Loop" presented by Jake Archibald at JSConf.Asia 2018](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
