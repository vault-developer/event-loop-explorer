# Event Loop Explorer

### Known limitations & simplifications:

1. Javascript code is parsed to AST using acorn parser, and then order of events are generated.
   All default examples are working as expected, you can try to modify the code and see how it is working.
   However, not all cases are covered.
   Async/await, complex Promises, SetInterval, assignment operators will not work as expected.
   If you would like to make it better, feel free to create PR to the project.

2. Render phase is usually triggered every 16.66ms (60fps), but in this project it is simplified to just every seconds Event Loop circle.
   We are counting every circle as 360ms for simplicity, so render phase is triggered every 720ms.

### Inspired by:

- https://www.jsv9000.app/
- http://latentflip.com/loupe
- https://www.youtube.com/watch?v=cCOL7MC4Pl0
- https://www.youtube.com/watch?v=eiC58R16hb8&t=160s

### Next steps:

- clean up the code
- debug line in editor
- code validation syntax https://github.com/ajaxorg/ace/wiki/Syntax-validation
- Add tests
- Add possibility to pause execution
- Replace styled components with emotion
- Gamification (achievements)
- Check js parsing edge cases
- Add animation for lists
- Add pictures for info and (maybe) animation

### TODO before making repo public:

- add semantic-release https://github.com/semantic-release/semantic-release/blob/master/docs/usage/getting-started.md
- update readme
- deploy to gh-pages or vercel
