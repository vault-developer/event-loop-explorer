import * as Styled from './Pointer.styled.ts';
import { useWheelStore } from 'store/store.ts';

function Pointer() {
	const grad = useWheelStore((state) => state.grad);

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
