import { EventInterface } from './EventLoop.types.ts';
import {
	useEditor,
	useEventLists,
	useEventLoopAnimation,
	useSpeedFactor,
} from '../../../../store/store.ts';
import { MutableRefObject, useCallback } from 'react';
import { nodeFactory } from '../../../../utils/nodes/factory.ts';
import { ArrowFunctionExpression } from 'acorn';
import {
	ActionInterface,
	CallStackValue,
	EventListsInterface,
	EventLoopAnimationInterface,
	SpeedFactorInterface,
} from '../../../../store/store.types.ts';
import useRefState from '../../../../utils/useRefState.tsx';

const DELAY_BETWEEN_ACTIONS_MS = 1000;

interface ProcessProps {
	eventListRef: MutableRefObject<EventListsInterface>;
	animationRef: MutableRefObject<EventLoopAnimationInterface>;
	speedFactorRef: MutableRefObject<SpeedFactorInterface['speed']>;
}

const processTask = async ({
	eventListRef,
	animationRef,
	speedFactorRef,
}: ProcessProps) => {
	const node = eventListRef.current.task_queue[0];
	eventListRef.current.set({ list: 'task_queue', type: 'shift' });

	if (node.node.type !== 'ArrowFunctionExpression') {
		// manage script
		node.context.actions = [];
		node.traverse();
		const { actions } = node.context;

		for (const step of actions) {
			await handleStep({ eventListRef, step, speedFactorRef, animationRef });
		}
	} else {
		// manage callbacks
		const expression = nodeFactory({
			node: (node.node as ArrowFunctionExpression).body,
			context: {
				...node.context,
				actions: [],
			},
			params: node.params,
		});

		expression.traverse();
		const { actions } = expression.context;

		for (const step of actions) {
			await handleStep({ eventListRef, step, speedFactorRef, animationRef });
		}
	}

	if (eventListRef.current.task_queue.length === 0)
		animationRef.current.setState(false, 'task');
};

const processMicroTask = async ({
	eventListRef,
	animationRef,
	speedFactorRef,
}: ProcessProps) => {
	while (eventListRef.current.microtask_queue.length) {
		const node = eventListRef.current.microtask_queue[0];
		eventListRef.current.set({ list: 'microtask_queue', type: 'shift' });

		const expression = nodeFactory({
			node: (node.node as ArrowFunctionExpression).body,
			context: {
				...node.context,
				actions: [],
			},
			params: node.params,
		});

		expression.traverse();
		const { actions } = expression.context;

		for (const step of actions) {
			await handleStep({ eventListRef, step, speedFactorRef, animationRef });
		}
	}
	animationRef.current.setState(false, 'microtask');
};

const processRender = async ({
	eventListRef,
	animationRef,
	speedFactorRef,
}: ProcessProps) => {
	if (eventListRef.current.render_callbacks.length === 0) {
		await new Promise((resolve) =>
			setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS / speedFactorRef.current)
		);
	}

	while (eventListRef.current.render_callbacks.length) {
		const node = eventListRef.current.render_callbacks[0];
		if (!node) {
			await new Promise((resolve) =>
				setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS / speedFactorRef.current)
			);
			animationRef.current.setState(false, 'render');
			return;
		}
		eventListRef.current.set({ list: 'render_callbacks', type: 'shift' });

		const expression = nodeFactory({
			node: (node.node as ArrowFunctionExpression).body,
			context: {
				...node.context,
				actions: [],
			},
			params: node.params,
		});
		expression.traverse();
		const { actions } = expression.context;

		for (const step of actions) {
			await handleStep({ eventListRef, step, speedFactorRef, animationRef });
		}
	}
	animationRef.current.setState(false, 'render');
};

export const useProcessEvent = () => {
	const eventListRef = useRefState(useEventLists, (state) => state);
	const animationRef = useRefState(useEventLoopAnimation, (state) => state);
	const speedFactorRef = useRefState(useSpeedFactor, (state) => state.speed);

	return useCallback(
		async (type: EventInterface['type']) => {
			if (type === 'task') {
				await processTask({ eventListRef, animationRef, speedFactorRef });
			} else if (type === 'microtask') {
				await processMicroTask({ eventListRef, animationRef, speedFactorRef });
			} else if (type === 'render') {
				await processRender({ eventListRef, animationRef, speedFactorRef });
			}
		},
		[eventListRef, animationRef, speedFactorRef]
	);
};

export const handleStep = async ({
	eventListRef,
	step,
	speedFactorRef,
	animationRef,
}: {
	eventListRef: MutableRefObject<EventListsInterface>;
	speedFactorRef: MutableRefObject<number>;
	animationRef: MutableRefObject<EventLoopAnimationInterface>;
	step: ActionInterface;
}) => {
	while (animationRef.current.status === 'paused') {
		await new Promise((resolve) => setTimeout(resolve, 200));
	}
	if (animationRef.current.status === 'disabled') return;

	if (step.type === 'push' && step.list === 'callstack') {
		const range = (step.value as CallStackValue).range;
		useEditor.getState().pushMarker([range.start, range.end]);
	}

	if (step.type === 'pop' && step.list === 'callstack') {
		useEditor.getState().popMarker();
	}

	eventListRef.current.set({
		list: step.list,
		type: step.type,
		value: step.value,
	});
	await new Promise((resolve) =>
		setTimeout(resolve, DELAY_BETWEEN_ACTIONS_MS / speedFactorRef.current)
	);
};
