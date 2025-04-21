import { FC, useState } from 'react';
import { InfoContainer } from '@/components/infoContainer';
import { Controls } from './controls';
import { Editor } from './editor';
import {
	DEFAULT_EXAMPLE_KEY,
	EXAMPLES,
} from '@/app/(main)/sections/configurator/controls.data';

const description = (
	<>
		<p>
			This code editor allows you to write and visualize JavaScript code
			execution within the event loop.
		</p>
		<ul>
			<li>
				- select a pre-built example from the dropdown menu or write your own
				code from scratch.
			</li>
			<li>
				- use the speed scrollbar to control the execution speed and observe how
				the event loop processes your code.
			</li>
			<li>
				- pause the execution when needed to examine the state of the event loop
				at any given point.
			</li>
		</ul>
	</>
);

export const Configurator: FC = () => {
	const [code, setCode] = useState(() => EXAMPLES[DEFAULT_EXAMPLE_KEY].code);

	return (
		<InfoContainer title="Code Editor" description={description}>
			<Controls code={code} setCode={setCode} />
			<Editor code={code} setCode={setCode} />
		</InfoContainer>
	);
};
