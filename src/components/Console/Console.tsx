import { useEventLists } from '../../store/store.ts';
import * as Styled from './Console.styled.ts';

function Console() {
	const tasks = useEventLists((state) => state.console);

	return (
		<Styled.LogQueue>
			{tasks.map((log, i) => (
				<Styled.Log key={log + i}>{log}</Styled.Log>
			))}
		</Styled.LogQueue>
	);
}

export default Console;
