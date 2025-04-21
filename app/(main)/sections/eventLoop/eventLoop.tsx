import { FC } from 'react';
import { InfoContainer } from '@/components/infoContainer';
import { Wheel } from '@/app/(main)/sections/eventLoop/wheel';

const description = (
	<>
		<p>
			The event loop is a fundamental concept in browser that manages the
			execution of code, handling of events, and updating of the user interface.
		</p>
		<p>
			The event loop continuously checks for and processes events and queued
			tasks in a specific order:
		</p>
		<ol>
			<li>1. Execute all synchronous code in the call stack</li>
			<li>
				2. Check the microtask queue (e.g., Promise callbacks) and execute all
				tasks.
			</li>
			<li>
				3. Check the macrotask queue (e.g., setTimeout, DOM events) and execute
				one task.
			</li>
			<li>4. Update the rendering if necessary.</li>
			<li>5. Repeat the process.</li>
		</ol>
	</>
);

export const EventLoop: FC = () => {
	return (
		<InfoContainer title="Event loop" description={description}>
			<div className="flex items-center justify-center grow">
				<Wheel />
			</div>
		</InfoContainer>
	);
};
