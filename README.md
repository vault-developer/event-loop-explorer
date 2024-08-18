# Event Loop Explainer


### Known limitations & simplifications:
1. Javascript code is parsed to AST using acorn parser, and then order of events are generated.  
All default examples are working as expected, you can try to modify the code and see how it is working.  
However, not all cases are covered.  
Async/await, complex Promises, SetInterval, assignment operators will not work as expected.  
If you would like to make it better, feel free to create PR to the project.

2. Render phase is usually triggered every 16.66ms (60fps), but in this project it is simplified to just every seconds Event Loop circle.
We are counting every circle as 360ms for simplicity, so render phase is triggered every 720ms.

### Inspired by
- https://www.jsv9000.app/
- http://latentflip.com/loupe
- https://kamronbekshodmonov.github.io/JELoop-Visualizer/

- https://www.youtube.com/watch?v=cCOL7MC4Pl0
- https://www.youtube.com/watch?v=eiC58R16hb8&t=160s


### TODO:
1. Чистить все очереди перед запуском нового кода
2. Сделать визуализацию событий в UI  => web api, render callbacks, microtasks
3. Сделать валидацию кода через в Editor https://github.com/ajaxorg/ace/wiki/Syntax-validation  
4. Внутри круга добавить анимашку в pixelart style
5. Попросить review  
5. Выложить 
6. Console and Stack lists make via NodeClass as well
7. Simplify css for lists
8. Сделать отдельную страничку с туториалом:  
   - когда вызывается каждая из тасок и почему
   - добавить голос
   - добавить live portrait