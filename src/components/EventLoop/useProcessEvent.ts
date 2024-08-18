import {EventInterface} from "./EventLoop.types.ts";
import {useEventListsState, useEventLoopAnimationState} from "../../store/store.ts";
import {useCallback} from "react";
import {nodeFactory} from "../../utils/nodes/factory.ts";
import {ArrowFunctionExpression} from "acorn";

const DELAY_BETWEEN_ACTIONS_MS = 1000;

export const useProcessEvent = () => {
  const mutable = useEventListsState(state => state.mutable);
  const set = useEventListsState(state => state.set);
  const setAnimation = useEventLoopAnimationState(state => state.setState);

  return useCallback(async (type: EventInterface['type']) => {
    if (type === 'task') {
      const node = mutable.task_queue[0];

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

      if (mutable.task_queue.length === 1) setAnimation(false, 'task');
      set({list: 'task_queue', type: 'shift'});
    } else if (type === 'microtask') {
      while (mutable.microtask_queue.length) {
        const node = mutable.microtask_queue[0];
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

        console.log('Actions from mTask', actions);
        for (const step of actions) {
          set({list: step.list, type: step.type, value: step.value});
          await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
        }

        set({list: 'microtask_queue', type: 'shift'});
      }
      setAnimation(false, 'microtask');
    } else if (type === 'render') {
      const node = mutable.render_callbacks[0];
      if (!node) {
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
        setAnimation(false, 'render');
        return;
      }
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

      set({list: 'render_callbacks', type: 'shift'});
      setAnimation(false, 'render');
    } else {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS));
    }
  }, [mutable]);
};