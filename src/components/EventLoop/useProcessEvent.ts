import { EventInterface } from './EventLoop.types.ts';
import { useEventLists, useEventLoopAnimation } from '../../store/store.ts';
import { MutableRefObject, useCallback } from 'react';
import { nodeFactory } from '../../utils/nodes/factory.ts';
import { ArrowFunctionExpression } from 'acorn';
import {
	EventListsInterface,
	EventLoopAnimationInterface,
} from '../../store/store.types.ts';
import useRefState from '../../utils/useRefState.tsx';

const DELAY_BETWEEN_ACTIONS_MS = 1000;

interface ProcessProps {
	eventListRef: MutableRefObject<EventListsInterface>;
	animationRef: MutableRefObject<EventLoopAnimationInterface>;
}

const processTask = async ({ eventListRef, animationRef }: ProcessProps) => {
	const node = eventListRef.current.task_queue[0];
	eventListRef.current.set({ list: 'task_queue', type: 'shift' });

	if (node.node.type !== 'ArrowFunctionExpression') {
		// manage script
		node.context.actions = [];
		node.traverse();
		const { actions } = node.context;

		for (const step of actions) {
			if (!animationRef.current.enabled) return;
			eventListRef.current.set({
				list: step.list,
				type: step.type,
				value: step.value,
			});
			await new Promise((resolve) =>
				setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS)
			);
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
		});

		expression.traverse();
		const { actions } = expression.context;

		for (const step of actions) {
			eventListRef.current.set({
				list: step.list,
				type: step.type,
				value: step.value,
			});
			await new Promise((resolve) =>
				setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS)
			);
		}
	}

	if (eventListRef.current.task_queue.length === 0)
		animationRef.current.setState(false, 'task');
};

const processMicroTask = async ({
	eventListRef,
	animationRef,
}: ProcessProps) => {
	while (eventListRef.current.microtask_queue.length) {
		const node = eventListRef.current.microtask_queue[0];
		eventListRef.current.set({ list: 'microtask_queue', type: 'shift' });

		const expression = nodeFactory({
			node: (node.node as ArrowFunctionExpression).body,
			context: {
				actions: [],
				functions: node.context.functions,
			},
			params: node.params,
		});

		expression.traverse();
		const { actions } = expression.context;

		for (const step of actions) {
			if (!animationRef.current.enabled) return;
			eventListRef.current.set({
				list: step.list,
				type: step.type,
				value: step.value,
			});
			await new Promise((resolve) =>
				setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS)
			);
		}
	}
	animationRef.current.setState(false, 'microtask');
};

const processRender = async ({ eventListRef, animationRef }: ProcessProps) => {
	if (eventListRef.current.render_callbacks.length === 0) {
		await new Promise((resolve) =>
			setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS)
		);
	}

	while (eventListRef.current.render_callbacks.length) {
		const node = eventListRef.current.render_callbacks[0];
		if (!node) {
			await new Promise((resolve) =>
				setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS)
			);
			animationRef.current.setState(false, 'render');
			return;
		}
		eventListRef.current.set({ list: 'render_callbacks', type: 'shift' });

		const expression = nodeFactory({
			node: (node.node as ArrowFunctionExpression).body,
			context: {
				actions: [],
				functions: node.context.functions,
			},
			params: node.params,
		});
		expression.traverse();
		const { actions } = expression.context;

		for (const step of actions) {
			if (!animationRef.current.enabled) return;
			eventListRef.current.set({
				list: step.list,
				type: step.type,
				value: step.value,
			});
			await new Promise((resolve) =>
				setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS)
			);
		}
	}
	animationRef.current.setState(false, 'render');
};

export const useProcessEvent = () => {
	const eventListRef = useRefState(useEventLists, (state) => state);
	const animationRef = useRefState(useEventLoopAnimation, (state) => state);

	return useCallback(
		async (type: EventInterface['type']) => {
			if (type === 'task') {
				await processTask({ eventListRef, animationRef });
			} else if (type === 'microtask') {
				await processMicroTask({ eventListRef, animationRef });
			} else if (type === 'render') {
				await processRender({ eventListRef, animationRef });
			}
		},
		[eventListRef, animationRef]
	);
};
