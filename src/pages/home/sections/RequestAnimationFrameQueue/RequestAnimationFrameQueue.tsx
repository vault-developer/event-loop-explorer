import { useQueueManagerStore } from 'store/store.ts';
import { BaseModalSection } from 'pages/home/sections/base/BaseModalSection/BaseModalSection.tsx';
import { BaseQueueElement } from 'pages/home/sections/base/BaseQueueElement/BaseQueueElement.tsx';
import { BaseQueue } from 'pages/home/sections/base/BaseQueue/BaseQueue.tsx';

const ModalContent = (
	<>
		<h2>RequestAnimationFrame</h2>
		<p style={{ marginBottom: 8 }}>
			The window.requestAnimationFrame() method tells the browser you wish to
			perform an animation. It requests the browser to call a user-supplied
			callback function before the next repaint.
		</p>
		<p style={{ marginBottom: 8 }}>
			The frequency of calls to the callback function will generally match the
			display refresh rate. The most common refresh rate is 60hz, (60
			cycles/frames per second), though 75hz, 120hz, and 144hz are also widely
			used.
		</p>
		<p>
			requestAnimationFrame() calls are paused in most browsers when running in
			background tabs or hidden iframes, in order to improve performance and
			battery life.
		</p>
	</>
);

function RequestAnimationFrameQueue({ className }: { className?: string }) {
	const callbacks = useQueueManagerStore((state) => state.rafCallback);

	return (
		<BaseModalSection
			className={className}
			title={'RequestAnimationFrame callbacks'}
			modalContent={ModalContent}
		>
			<BaseQueue>
				{callbacks.map((callback) => (
					<BaseQueueElement key={callback}>{callback}</BaseQueueElement>
				))}
			</BaseQueue>
		</BaseModalSection>
	);
}

export default RequestAnimationFrameQueue;
