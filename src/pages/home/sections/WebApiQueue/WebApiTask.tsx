import { forwardRef, Ref, useEffect, useState } from 'react';
import * as Styled from './WebApiTask.styled.ts';
import { WebApiSectionElement } from 'src/types.ts';
import { useSimulatorStore } from 'store/store.ts';

const WebApiTask = forwardRef(
	({ task }: { task: WebApiSectionElement }, ref: Ref<HTMLDivElement>) => {
		const delay = task.end - task.start;
		const [progress, setProgress] = useState(100);

		useEffect(() => {
			const checkProgress = () => {
				const remainingTime = task.end - useSimulatorStore.getState().time;
				const progressPercentage = Math.trunc((remainingTime / delay) * 100);
				const newProgress = Math.max(0, Math.min(progressPercentage, 100));
				setProgress(newProgress);

				if (newProgress > 0) {
					setTimeout(checkProgress, 250);
				}
			};
			checkProgress();
		}, []);

		return (
			<Styled.Progress progress={progress} ref={ref}>
				<Styled.WebApiItem />
				<div style={{ zIndex: 1, overflowWrap: 'anywhere', margin: 'auto' }}>
					{task.value}
				</div>
			</Styled.Progress>
		);
	}
);

export default WebApiTask;
