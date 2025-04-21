import { FC } from 'react';
import { InfoContainer } from '@/components/infoContainer';
import { List } from '@/components/list';
import { Card } from '@/components/card';
import { useQueueManagerStore } from '@/store/store';

const description = (
	<>
		<p>
			The window.requestAnimationFrame() method tells the browser you wish to
			perform an animation. It requests the browser to call a user-supplied
			callback function before the next repaint.
		</p>
		<p>
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

export const RequestAnimationFrame: FC = () => {
	const rafCallback = useQueueManagerStore((state) => state.rafCallback);

	return (
		<InfoContainer
			title="RequestAnimationFrame callbacks"
			description={description}
		>
			<List data={rafCallback} orientation="horizontal">
				{(el) => <Card text={el as (typeof rafCallback)[0]} />}
			</List>
		</InfoContainer>
	);
};
