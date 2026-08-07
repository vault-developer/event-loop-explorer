import { FC } from 'react';
import { InfoContainer } from '@/components/infoContainer';
import { Card } from '@/components/card';
import { List } from '@/components/list';
import { useQueueManagerStore } from '@/store/store';

const description = (
	<>
		<p>
			A microtask is a short function which is executed after the function or
			program which created it exits and only if the JavaScript execution stack
			is empty, but before returning control to the event loop being used by the
			user agent to drive the script&#39;s execution environment.
		</p>
		<p>Events that can trigger new microtasks:</p>
		<ul>
			<li>- Promise resolution (.then(), .catch(), .finally())</li>
			<li>- Occurrence of observed DOM changes</li>
			<li>- queueMicrotask() method</li>
		</ul>
	</>
);

export const MicrotasksQueue: FC = () => {
	const microtasks = useQueueManagerStore((state) => state.microtask);

	return (
		<InfoContainer title="Microtasks Queue" description={description}>
			<List data={microtasks} orientation="horizontal">
				{(el) => <Card text={el as (typeof microtasks)[0]} />}
			</List>
		</InfoContainer>
	);
};
