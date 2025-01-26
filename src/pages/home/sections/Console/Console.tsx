import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './Console.styled.ts';
import { List } from '../../Home.styled.ts';

function Console({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.console);

	return (
		<List className={className}>
			<span>Console</span>
			<Styled.LogQueue>
				{tasks.map((log, i) => (
					<Styled.Log key={log + i}>{log}</Styled.Log>
				))}
			</Styled.LogQueue>
		</List>
	);
}

export default Console;
