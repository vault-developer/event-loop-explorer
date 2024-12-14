import { useEventLists } from '../../../../store/store.ts';
import * as Styled from './Console.styled.ts';
import { Zoom } from '@mui/material';

function Console() {
	const tasks = useEventLists((state) => state.console);

	return (
		<Styled.LogQueue>
			{tasks.map((log, i) => (
				<Zoom in key={log + i}>
					<Styled.Log>{log}</Styled.Log>
				</Zoom>
			))}
		</Styled.LogQueue>
	);
}

export default Console;
