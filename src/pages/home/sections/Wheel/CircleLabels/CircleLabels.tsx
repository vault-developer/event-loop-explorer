import { events } from '../Wheel.data.ts';
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
	return (
		<Styled.LabelsWrapper>
			{enhancedEvents.map(
				({ title, longTitle, leftOffset, topOffset, degree, placement }) => (
					<Tooltip title={longTitle} placement={placement} key={degree}>
						<Styled.Label left={leftOffset} top={topOffset}>
							{title}
						</Styled.Label>
					</Tooltip>
				)
			)}
		</Styled.LabelsWrapper>
	);
}

export default CircleLabels;
