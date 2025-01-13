import * as Styled from './Pointer.styled.ts';
import { useTimeStore } from 'store/store.ts';

function Pointer() {
	const grad = useTimeStore((state) => state.grad);

	// TODO: consider direct style change w/o component re-render
	return (
		<>
			<Styled.SectorWithInnerBorder
				style={{ transform: `rotate(${grad - 80}deg)` }}
			/>
			<Styled.SectorWithOuterBorder
				style={{ transform: `rotate(${grad - 80}deg)` }}
			/>
		</>
	);
}

export default Pointer;
