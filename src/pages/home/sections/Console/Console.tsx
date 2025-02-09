import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './Console.styled.ts';
import { BaseSection } from 'pages/home/sections/BaseSection/BaseSection.tsx';

function Console({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.console);

	return (
		<BaseSection className={className} title={'Console'}>
			<Styled.LogQueue>
				{tasks.map((log, i) => (
					<Styled.Log key={log + i}>{log}</Styled.Log>
				))}
			</Styled.LogQueue>
		</BaseSection>
	);
}

export default Console;
