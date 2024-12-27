import Pointer from './Pointer/Pointer.tsx';
import { useEventLoopAnimation } from '../../../../store/store.ts';
import CircleLabels from './CircleLabels/CircleLabels.tsx';
import { events } from './Wheel.data.ts';
import * as Styled from './Wheel.styled.ts';
import { useTheme } from '@emotion/react';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';
import { BaseLayoutElement } from '../../Home.styled.ts';
import { EVENT_LOOP_ID } from '../../../../utils/constants.ts';
import WheelModal from './Wheel.modal.tsx';

function Wheel({ className }: { className?: string }) {
	const animation = useEventLoopAnimation((state) => state);
	const theme = useTheme();
	const [open, toggle] = useBoolean(false);

	return (
		<BaseLayoutElement className={className}>
			<p id={EVENT_LOOP_ID}>Event Loop</p>
			<Styled.EventLoopBody>
				<InfoIcon onClick={toggle} />
				<Styled.CircleContainer>
					<Styled.CircleOuter />
					{events.map(({ degree, type }) => {
						const enabled = animation[type] ? 'enabled' : 'disabled';
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
				<WheelModal open={open} toggle={toggle} />
			</Styled.EventLoopBody>
		</BaseLayoutElement>
	);
}

export default Wheel;
