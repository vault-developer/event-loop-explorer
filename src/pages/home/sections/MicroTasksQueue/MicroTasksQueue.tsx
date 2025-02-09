import { useQueueManagerStore } from 'store/store.ts';
import { BaseModalSection } from 'pages/home/sections/base/BaseModalSection/BaseModalSection.tsx';
import { BaseQueueElement } from 'pages/home/sections/base/BaseQueueElement/BaseQueueElement.tsx';
import { BaseQueue } from 'pages/home/sections/base/BaseQueue/BaseQueue.tsx';

const ModalContent = (
	<>
		<h2>Microtasks</h2>
		<p>
			A microtask is a short function which is executed after the function or
			program which created it exits and only if the JavaScript execution stack
			is empty, but before returning control to the event loop being used by the
			user agent to drive the script's execution environment.
		</p>
		<p style={{ marginTop: 12 }}>Events that can trigger new microtasks:</p>
		<ul style={{ marginTop: 8 }}>
			<li>Promise resolution (.then(), .catch(), .finally())</li>
			<li>Occurrence of observed DOM changes</li>
			<li>queueMicrotask() method</li>
		</ul>
	</>
);

function MicroTasksQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.microtask);

	return (
		<BaseModalSection
			className={className}
			title={'Microtasks Queue'}
			modalContent={ModalContent}
		>
			<BaseQueue>
				{tasks.map((task) => (
					<BaseQueueElement key={task}>{task}</BaseQueueElement>
				))}
			</BaseQueue>
		</BaseModalSection>
	);
}

export default MicroTasksQueue;
