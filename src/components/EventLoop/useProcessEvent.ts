import {EventInterface} from "./EventLoop.types.ts";
import {useEventListsState} from "../../store/store.ts";
import {useCallback} from "react";

export const useProcessEvent = () => {
  const lists = useEventListsState();

  return useCallback(async (type: EventInterface['type']) => {
    if (type === 'task') {
      const node = lists.task_queue[0];
      node.traverse();
      const {steps} = node.context;

      console.log('STEPS', steps);
      for (const step of steps) {
        lists.set({list: step.sector, type: step.action, value: step.value});
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      lists.set({list: 'task_queue', type: 'shift'});
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }, [lists]);
};