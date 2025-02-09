import WebApiTask from './WebApiTask.tsx';
import { useQueueManagerStore } from 'store/store.ts';
import { BaseModalSection } from '../BaseModalSection/BaseModalSection.tsx';
import { BaseQueue } from '../BaseQueue/BaseQueue.tsx';

const ModalContent = (
	<>
		<h2>Web API</h2>
		<p>
			Web APIs extend the capabilities of JavaScript in web browsers, allowing
			access to device hardware, operating system features, and more complex
			browser functions.
		</p>
		<p style={{ marginTop: 12 }}>Examples:</p>
		<ul style={{ marginTop: 8 }}>
			<li>DOM API: For manipulating web page content and structure</li>
			<li>Fetch API: For making HTTP requests</li>
			<li>Web Storage API: For storing data in the browser</li>
			<li>Geolocation API: For accessing device location</li>
			<li>Canvas API: For drawing graphics</li>
			<li>Web Audio API: For processing and synthesizing audio</li>
		</ul>
	</>
);

function WebApiQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.webApi);

	return (
		<BaseModalSection
			className={className}
			title={'Web Api'}
			modalContent={ModalContent}
		>
			<BaseQueue>
				{tasks.map((task) => (
					<WebApiTask key={task.value} task={task} />
				))}
			</BaseQueue>
		</BaseModalSection>
	);
}

export default WebApiQueue;
