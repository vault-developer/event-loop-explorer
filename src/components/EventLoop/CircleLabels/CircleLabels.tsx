import { events } from '../EventLoop.data.ts';
import * as Styled from './CircleLabels.styled.ts';
import { Tooltip } from '@mui/material';

const enhancedEvents = events.map((event) => {
	const cos = Math.cos((event.degree * Math.PI) / 180);
	const sin = Math.sin((event.degree * Math.PI) / 180);
	const leftOffset = 150 + cos * (150 - 25);
	const topOffset = 150 + sin * (150 - 25);
	return {
		...event,
		leftOffset,
		topOffset,
	};
});

function CircleLabels() {
	const onClick = () => console.log('click');

	return (
		<Styled.LabelsWrapper>
			{enhancedEvents.map(
				({ title, longTitle, leftOffset, topOffset, degree, placement }) => (
					<Tooltip title={longTitle} placement={placement}>
						<Styled.Label
							onClick={onClick}
							left={leftOffset}
							top={topOffset}
							key={degree}
						>
							{title}
						</Styled.Label>
					</Tooltip>
				)
			)}
		</Styled.LabelsWrapper>
	);
}

export default CircleLabels;
