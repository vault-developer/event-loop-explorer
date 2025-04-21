import { useTimeStore, useWheelStore } from '@/store/store';
import { useEffect } from 'react';
import { cn } from '@/utils/utils';

const POINTER_TOP_ID = 'wheel-pointer-top';
const POINTER_BOTTOM_ID = 'wheel-pointer-bottom';
const POINTER_LEFT_ID = 'wheel-pointer-left';
const POINTER_RIGHT_ID = 'wheel-pointer-right';
const WHEEL_ID = 'wheel';

const MICROTASK_CLASS = 'microtask fill-[var(--chart-1)]';
const MACROTASK_CLASS = 'macrotask fill-[var(--chart-2)]';
const RENDER_CLASS = 'render fill-[var(--chart-3)]';

const SEGMENT_OFFSET = -9;
const POINTER_OFFSET = -99;
const FONT_WEIGHT = 500;
const FONT_SIZE = 11;

export const Wheel = () => {
	const { render, macrotask, microtask } = useWheelStore();

	const renderClass = render ? RENDER_CLASS : cn(RENDER_CLASS, 'opacity-25');
	const microtaskClass = microtask
		? MICROTASK_CLASS
		: cn(MICROTASK_CLASS, 'opacity-25');
	const macrotaskClass = macrotask
		? MACROTASK_CLASS
		: cn(MACROTASK_CLASS, 'opacity-25');

	useEffect(() => {
		return useTimeStore.subscribe(({ grad }) => {
			const top = document.getElementById(POINTER_TOP_ID);
			const right = document.getElementById(POINTER_RIGHT_ID);
			const left = document.getElementById(POINTER_LEFT_ID);
			const bottom = document.getElementById(POINTER_BOTTOM_ID);

			const corrected = grad + POINTER_OFFSET;

			if (top && right && left && bottom) {
				top.style.transform = `rotate(${corrected}deg)`;
				right.style.transform = `rotate(${corrected + 18}deg)`;
				left.style.transform = `rotate(${corrected}deg)`;
				bottom.style.transform = `rotate(${corrected}deg)`;
			}
		});
	}, []);

	return (
		<div className="relative w-[300] h-[300] overflow-hidden">
			<svg
				id={WHEEL_ID}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="-100 -100 200 200"
			>
				<defs>
					<path
						id="segment"
						d="M 0 0 L 97 0 A 97 97 0 0 1 92.26036 29.96953 Z"
					/>
				</defs>
				<path
					id={POINTER_TOP_ID}
					d="M 0 0 L 100 0 A 100 100 0 0 1 95.11 30.90 Z"
					className="fill-[var(--primary)]"
					transform={`rotate(${POINTER_OFFSET})`}
				/>
				<circle
					id="wheel"
					cx="0"
					cy="0"
					r="97"
					className="fill-[var(--color-secondary)]"
				/>
				<use
					href="#segment"
					className={microtaskClass}
					transform={`rotate(${SEGMENT_OFFSET - 30})`}
				>
					<title>Microtask</title>
				</use>
				<use href="#segment" className={renderClass} transform="rotate(-9)">
					<title>Render</title>
				</use>
				<use
					href="#segment"
					className={microtaskClass}
					transform={`rotate(${SEGMENT_OFFSET + 30})`}
				>
					<title>Microtask</title>
				</use>
				<use
					href="#segment"
					className={microtaskClass}
					transform={`rotate(${SEGMENT_OFFSET + 150})`}
				>
					<title>Microtask</title>
				</use>
				<use
					href="#segment"
					className={macrotaskClass}
					transform={`rotate(${SEGMENT_OFFSET + 180})`}
				>
					<title>Task</title>
				</use>
				<use
					href="#segment"
					className={microtaskClass}
					transform={`rotate(${SEGMENT_OFFSET + 210})`}
				>
					<title>Microtask</title>
				</use>
				<circle
					id="center-mock-outer"
					cx="0"
					cy="0"
					r="69"
					className="fill-[var(--card)]"
				/>
				<path
					id={POINTER_BOTTOM_ID}
					d="M 0 0 L 69 0 A 68 68 0 0 1 65.41 21.39 Z"
					className="fill-[var(--primary)]"
					transform={`rotate(${POINTER_OFFSET})`}
				/>
				<path
					id={POINTER_LEFT_ID}
					d="M 0 0 L 100 0"
					className="stroke-[var(--primary)]"
					strokeWidth="3"
					transform={`rotate(${POINTER_OFFSET})`}
				/>
				<path
					id={POINTER_RIGHT_ID}
					d="M 0 0 L 100 0"
					className="stroke-[var(--primary)]"
					strokeWidth="3"
					transform={`rotate(${POINTER_OFFSET + 18})`}
				/>
				<circle
					id="center-mock-inner"
					cx="0"
					cy="0"
					r="66"
					className="fill-[var(--card)]"
				/>
				<text
					x="-79"
					y="-38"
					className="fill-[var(--primary)]"
					fontSize={FONT_SIZE}
					fontWeight={FONT_WEIGHT}
				>
					mT<title>Microtask</title>
				</text>
				<text
					x="65"
					y="-38"
					className="fill-[var(--primary)]"
					fontSize={FONT_SIZE}
					fontWeight={FONT_WEIGHT}
				>
					mT<title>Microtask</title>
				</text>
				<text
					x="65"
					y="44"
					className="fill-[var(--primary)]"
					fontSize={FONT_SIZE}
					fontWeight={FONT_WEIGHT}
				>
					mT<title>Microtask</title>
				</text>
				<text
					x="-79"
					y="44"
					className="fill-[var(--primary)]"
					fontSize={FONT_SIZE}
					fontWeight={FONT_WEIGHT}
				>
					mT<title>Microtask</title>
				</text>
				<text
					x="80"
					y="3"
					className="fill-[var(--primary)]"
					fontSize={FONT_SIZE}
					fontWeight={FONT_WEIGHT}
				>
					R<title>Render</title>
				</text>
				<text
					x="-86"
					y="3"
					className="fill-[var(--primary)]"
					fontSize={FONT_SIZE}
					fontWeight={FONT_WEIGHT}
				>
					T<title>Task</title>
				</text>
			</svg>
		</div>
	);
};
