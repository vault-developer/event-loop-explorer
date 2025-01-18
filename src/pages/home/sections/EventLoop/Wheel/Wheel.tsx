import Pointer from './Pointer/Pointer.tsx';
import CircleLabels from './CircleLabels/CircleLabels.tsx';
import { events } from './Wheel.data.ts';
import * as Styled from './Wheel.styled.ts';
import { useTheme } from '@emotion/react';
import { useWheelStore } from 'store/store.ts';

function Wheel() {
	const microtask = useWheelStore((state) => state.microtask);
	const render = useWheelStore((state) => state.render);
	const macrotask = useWheelStore((state) => state.macrotask);
	const stops = { microtask, render, macrotask };
	const theme = useTheme();

	const { primary, secondary, tertiary } = theme.custom.colors;
	const colors = {
		microtask: primary,
		macrotask: secondary,
		render: tertiary,
	};

	return (
		<Styled.CircleContainer>
			<Styled.CircleOuter />
			{events.map(({ degree, type }) => {
				const enabled = stops[type];
				const background = colors[type];
				return (
					<Styled.Sector
						id={`sector-${type}-new`}
						key={degree}
						enabled={enabled}
						background={background}
						degree={360 - degree + 10}
					/>
				);
			})}
			<Pointer />
			<Styled.CircleInner />
			<CircleLabels />
		</Styled.CircleContainer>
	);
}

export default Wheel;
