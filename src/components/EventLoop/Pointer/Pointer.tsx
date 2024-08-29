import { useEffect, useRef } from 'react';
import {
	useEventLoopAnimation,
	useEventLoopTime,
} from '../../../store/store.ts';
import { events } from '../EventLoop.data.ts';
import { EventInterface } from '../EventLoop.types.ts';
import { useProcessEvent } from '../useProcessEvent.ts';
import useRefState from '../../../utils/useRefState.tsx';
import * as Styled from './Pointer.styled.ts';

const RENDER_DELAY_MS = 720;
let timeFromLastRender = 0;

const stops = new Set(events.map((event) => event.degree));
const typeByStop = events.reduce(
	(acc, event) => {
		acc[event.degree] = event.type;
		return acc;
	},
	{} as Record<number, EventInterface['type']>
);

function Pointer() {
	const setState = useEventLoopAnimation((state) => state.setState);
	const animationStatus = useEventLoopAnimation((state) => state.status);
	const animationRef = useRefState(useEventLoopAnimation, (state) => state);
	const incrementTime = useEventLoopTime((state) => state.increment);
	const processEvent = useProcessEvent();
	const angleRef = useRef(100 - 10);

	const sectorInnerRef = useRef<HTMLDivElement>(null);
	const sectorOuterRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const animate = async () => {
			if (animationRef.current.status === 'disabled') {
				angleRef.current = 100 - 10;
				timeFromLastRender = 0;
				if (sectorInnerRef.current && sectorOuterRef.current) {
					sectorInnerRef.current.style.transform = `rotate(${360 - angleRef.current + 10}deg)`;
					sectorOuterRef.current.style.transform = `rotate(${360 - angleRef.current + 10}deg)`;
				}
				return;
			}
			if (animationRef.current.status === 'paused') {
				return;
			}
			if (sectorInnerRef.current && sectorOuterRef.current) {
				const angleWithOffset = angleRef.current + 1;
				if (stops.has(angleWithOffset)) {
					const type = typeByStop[angleWithOffset];
					if (animationRef.current[type]) {
						await processEvent(type);
					}
				}
				sectorInnerRef.current.style.transform = `rotate(${360 - angleRef.current + 10}deg)`;
				sectorOuterRef.current.style.transform = `rotate(${360 - angleRef.current + 10}deg)`;
				angleRef.current = angleRef.current - 1;
				timeFromLastRender += 1;
				incrementTime();
				if (angleWithOffset < 0) {
					angleRef.current = angleRef.current + 360;
				}
				if (timeFromLastRender >= RENDER_DELAY_MS) {
					setState(true, 'render');
					timeFromLastRender = 0;
				}
			}
			requestAnimationFrame(animate);
		};

		animate();
	}, [animationStatus]);

	return (
		<>
			<Styled.SectorWithInnerBorder ref={sectorInnerRef} />
			<Styled.SectorWithOuterBorder ref={sectorOuterRef} />
		</>
	);
}

export default Pointer;
