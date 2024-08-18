import {EventInterface} from "./EventLoop.types.ts";
import {useEventListsState, useEventLoopAnimationState} from "../../store/store.ts";
import {useCallback} from "react";
import {nodeFactory} from "../../utils/nodes/factory.ts";
import {ArrowFunctionExpression} from "acorn";
import {EventListsState, EventLoopAnimationState} from "../../store/store.types.ts";

const DELAY_BETWEEN_ACTIONS_MS = 1000;

const processTask = async ({mutable, set, setAnimation}: {
  mutable: EventListsState['mutable'],
  set: EventListsState['set'],
  setAnimation: EventLoopAnimationState['setState']
}) => {
  const node = mutable.task_queue[0];
  set({list: 'task_queue', type: 'shift'});

  if (node.node.type !== 'ArrowFunctionExpression') {
    // manage script
    node.context.actions = [];
    node.traverse();
    const {actions} = node.context;

    for (const step of actions) {
      set({list: step.list, type: step.type, value: step.value});
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
    }
  } else {
    // manage callbacks
    const expression = nodeFactory({
      node: (node.node as ArrowFunctionExpression).body,
      context: {
        actions: [],
        functions: node.context.functions,
      },
      params: node.params,
    })

    expression.traverse();
    const {actions} = expression.context;

    for (const step of actions) {
      set({list: step.list, type: step.type, value: step.value});
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
    }
  }

  if (mutable.task_queue.length === 0) setAnimation(false, 'task');
}

const processMicroTask = async ({mutable, set, setAnimation}: {
  mutable: EventListsState['mutable'],
  set: EventListsState['set'],
  setAnimation: EventLoopAnimationState['setState']
}) => {
  while (mutable.microtask_queue.length) {
    const node = mutable.microtask_queue[0];
    set({list: 'microtask_queue', type: 'shift'});

    const expression = nodeFactory({
      node: (node.node as ArrowFunctionExpression).body,
      context: {
        actions: [],
        functions: node.context.functions,
      },
      params: node.params,
    })

    expression.traverse();
    const {actions} = expression.context;

    for (const step of actions) {
      set({list: step.list, type: step.type, value: step.value});
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
    }
  }
  setAnimation(false, 'microtask');
}


const processRender = async ({mutable, set, setAnimation}: {
  mutable: EventListsState['mutable'],
  set: EventListsState['set'],
  setAnimation: EventLoopAnimationState['setState']
}) => {
  if (mutable.render_callbacks.length === 0) {
    await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
  }

  while (mutable.render_callbacks.length) {
    const node = mutable.render_callbacks[0];
    if (!node) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
      setAnimation(false, 'render');
      return;
    }
    set({list: 'render_callbacks', type: 'shift'});

    const expression = nodeFactory({
      node: (node.node as ArrowFunctionExpression).body,
      context: {
        actions: [],
        functions: node.context.functions,
      },
      params: node.params,
    })
    expression.traverse();
    const {actions} = expression.context;

    for (const step of actions) {
      set({list: step.list, type: step.type, value: step.value});
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
    }
  }
  setAnimation(false, 'render');
}

export const useProcessEvent = () => {
  const mutable = useEventListsState(state => state.mutable);
  const set = useEventListsState(state => state.set);
  const setAnimation = useEventLoopAnimationState(state => state.setState);

  return useCallback(async (type: EventInterface['type']) => {
    if (type === 'task') {
      await processTask({mutable, set, setAnimation});
    } else if (type === 'microtask') {
      await processMicroTask({mutable, set, setAnimation});
    } else if (type === 'render') {
      await processRender({mutable, set, setAnimation});
    }
  }, [mutable]);
};