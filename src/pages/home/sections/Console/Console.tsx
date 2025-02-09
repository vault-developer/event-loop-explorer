import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './Console.styled.ts';
import { BaseSection } from 'pages/home/sections/BaseSection/BaseSection.tsx';
import { BaseQueueElement } from 'pages/home/sections/BaseQueueElement/BaseQueueElement.tsx';

function Console({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.console);

	return (
		<BaseSection className={className} title={'Console'}>
			<Styled.LogQueue>
				{tasks.map((log, i) => (
					<BaseQueueElement isVertical key={log + i}>
						{log}
					</BaseQueueElement>
				))}
			</Styled.LogQueue>
		</BaseSection>
	);
}

export default Console;
