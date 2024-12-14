import Pointer from './Pointer/Pointer.tsx';
import { useEventLoopAnimation } from '../../../../store/store.ts';
import CircleLabels from './CircleLabels/CircleLabels.tsx';
import { events } from './EventLoop.data.ts';
import * as Styled from './EventLoop.styled.ts';
import { useTheme } from '@emotion/react';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import InfoModal from '../../../../components/Modal/Modal.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';

function EventLoop() {
	const animation = useEventLoopAnimation((state) => state);
	const theme = useTheme();
	const [open, setOpen, setClose] = useBoolean(false);

	return (
		<>
			<InfoIcon onClick={setOpen} />
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
			<InfoModal isOpen={open} onClose={setClose}>
				<h2>Event Loop</h2>
				<Styled.CloseIcon onClick={setClose} />
				<p style={{ marginBottom: 8 }}>
					The event loop is a fundamental concept in browser that manages the
					execution of code, handling of events, and updating of the user
					interface.
				</p>
				<p style={{ marginTop: 12 }}>
					The event loop continuously checks for and processes events and queued
					tasks in a specific order:
				</p>
				<ol style={{ marginTop: 8 }}>
					<li>Execute all synchronous code in the call stack</li>
					<li>
						Check the microtask queue (e.g., Promise callbacks) and execute all
						tasks.
					</li>
					<li>
						Check the macrotask queue (e.g., setTimeout, DOM events) and execute
						one task.
					</li>
					<li>Update the rendering if necessary.</li>
					<li>Repeat the process.</li>
				</ol>
			</InfoModal>
		</>
	);
}

export default EventLoop;
