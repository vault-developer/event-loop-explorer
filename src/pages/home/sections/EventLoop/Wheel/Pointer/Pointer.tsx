import * as Styled from './Pointer.styled.ts';
import { useTimeStore } from 'store/store.ts';
import { useEffect } from 'react';

const INNER_POINTER_ID = 'InnerPointerId';
const OUTER_POINTER_ID = 'OuterPointerId';

function Pointer() {
	useEffect(() => {
		return useTimeStore.subscribe(({ grad }) => {
			const innerBorder = document.getElementById(INNER_POINTER_ID);
			const outerBorder = document.getElementById(OUTER_POINTER_ID);

			if (innerBorder && outerBorder) {
				innerBorder.style.transform = `rotate(${grad - 80}deg)`;
				outerBorder.style.transform = `rotate(${grad - 80}deg)`;
			}
		});
	}, []);

	return (
		<>
			<Styled.SectorWithInnerBorder id={INNER_POINTER_ID} />
			<Styled.SectorWithOuterBorder id={OUTER_POINTER_ID} />
		</>
	);
}

export default Pointer;
