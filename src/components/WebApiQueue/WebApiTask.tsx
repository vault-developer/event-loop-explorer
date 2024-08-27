import { nodeFactory } from '../../utils/nodes/factory.ts';
import { NodeClass } from '../../utils/nodes/Node.abstract.ts';
import { Literal } from 'acorn';
import { useEventLists, useEventLoopTime } from '../../store/store.ts';
import { useEffect, useRef, useState } from 'react';
import useRefState from '../../utils/useRefState.tsx';
import { EventLoopTimeInterface } from '../../store/store.types.ts';
import * as Styled from './WebApiTask.styled.ts';

function WebApiTask({ task }: { task: NodeClass }) {
	const serializedArgs =
		task.args
			?.map((arg) =>
				nodeFactory({
					node: arg,
					context: task.context,
					params: task.params,
				}).serialize()
			)
			.join(', ') ?? '';
	const serialized = `${task.serialize()}(${serializedArgs})`;
	const delay = ((task.args?.[1] as Literal).value ?? 0) as number;
	const timeRef = useRefState<EventLoopTimeInterface, number>(
		useEventLoopTime,
		(state) => state.time
	);
	const set = useEventLists((state) => state.set);
	const finish = useRef(timeRef.current + delay);
	const [progress, setProgress] = useState(100);
	const executed = useRef(false);

	useEffect(() => {
		const checkProgress = () => {
			const remainingTime = finish.current - timeRef.current;
			const progressPercentage = Math.trunc((remainingTime / delay) * 100);
			const newProgress = Math.max(0, Math.min(progressPercentage, 100));
			setProgress(newProgress);

			if (newProgress > 0) {
				setTimeout(checkProgress, 250);
			} else {
				if (executed.current) return;
				executed.current = true;
				set({ list: 'web_api', type: 'delete', value: task });
				set({
					list: 'task_queue',
					type: 'push',
					value: nodeFactory({
						node: task.args![0],
						context: task.context,
						params: task.params,
					}),
				});
			}
		};
		checkProgress();
	}, []);

	return (
		<Styled.Progress key={serialized} progress={progress}>
			<Styled.WebApiItem />
			<div style={{ zIndex: 1 }}>{serialized}</div>
		</Styled.Progress>
	);
}

export default WebApiTask;
