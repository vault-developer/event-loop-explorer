import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './Console.styled.ts';
import { Zoom } from '@mui/material';
import { List } from '../../Home.styled.ts';

function Console({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.console);

	return (
		<List className={className}>
			<span>Console</span>
			<Styled.LogQueue>
				{tasks.map((log, i) => (
					<Zoom in key={log + i}>
						<Styled.Log>{log}</Styled.Log>
					</Zoom>
				))}
			</Styled.LogQueue>
		</List>
	);
}

export default Console;
