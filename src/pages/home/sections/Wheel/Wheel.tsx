import Pointer from './Pointer/Pointer.tsx';
import CircleLabels from './CircleLabels/CircleLabels.tsx';
import { events } from './Wheel.data.ts';
import * as Styled from './Wheel.styled.ts';
import { useTheme } from '@emotion/react';
import InfoIcon from 'components/InfoIcon/InfoIcon.tsx';
import useBoolean from '../../../../hooks/useBoolean.tsx';
import { BaseLayoutElement } from 'pages/home/Home.styled.ts';
import { EVENT_LOOP_ID } from 'utils/constants.ts';
import WheelModal from './Wheel.modal.tsx';
import { useWheelStore } from 'store/store.ts';

function Wheel({ className }: { className?: string }) {
	const microtask = useWheelStore((state) => state.microtask);
	const render = useWheelStore((state) => state.render);
	const macrotask = useWheelStore((state) => state.macrotask);
	const stops = { microtask, render, macrotask };
	const theme = useTheme();
	const [isOpened, toggle] = useBoolean(false);

	return (
		<BaseLayoutElement className={className}>
			<p id={EVENT_LOOP_ID}>Event Loop</p>
			<Styled.EventLoopBody>
				<InfoIcon onClick={toggle} />
				<Styled.CircleContainer>
					<Styled.CircleOuter />
					{events.map(({ degree, type }) => {
						const enabled = stops[type] ? 'enabled' : 'disabled';
						const background = theme.custom.colors.wheel[type][enabled];
						return (
							<Styled.Sector
								id={`sector-${type}-new`}
								key={degree}
								background={background}
								degree={360 - degree + 10}
							/>
						);
					})}
					<Pointer />
					<Styled.CircleInner />
					<CircleLabels />
				</Styled.CircleContainer>
				<WheelModal isOpened={isOpened} toggle={toggle} />
			</Styled.EventLoopBody>
		</BaseLayoutElement>
	);
}

export default Wheel;
