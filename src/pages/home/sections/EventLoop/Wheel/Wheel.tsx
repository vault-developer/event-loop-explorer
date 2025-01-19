import * as Styled from './Wheel.styled.ts';
import { useTheme } from '@emotion/react';
import { useTimeStore, useWheelStore } from 'store/store.ts';
import { useEffect } from 'react';

const POINTER_TOP_ID = 'wheel-pointer-top';
const POINTER_BOTTOM_ID = 'wheel-pointer-bottom';
const POINTER_LEFT_ID = 'wheel-pointer-left';
const POINTER_RIGHT_ID = 'wheel-pointer-right';
const WHEEL_ID = 'wheel';

const MICROTASK_CLASS = 'microtask';
const MACROTASK_CLASS = 'macrotask';
const RENDER_CLASS = 'render';

const SEGMENT_OFFSET = -9;
const POINTER_OFFSET = -99;

function Wheel() {
	const theme = useTheme();

	const colors = {
		pointer: theme.custom.colors.onContainer.contrast,
		wheel: theme.custom.colors.onContainer.dim,
		background: theme.custom.colors.container,
		microtask: {
			disabled: theme.custom.colors.primary.dim,
			enabled: theme.custom.colors.primary.contrast,
		},
		macrotask: {
			disabled: theme.custom.colors.secondary.dim,
			enabled: theme.custom.colors.secondary.contrast,
		},
		render: {
			disabled: theme.custom.colors.tertiary.dim,
			enabled: theme.custom.colors.tertiary.contrast,
		},
	};

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

	useEffect(() => {
		return useWheelStore.subscribe(({ render, macrotask, microtask }) => {
			const wheel = document.getElementById(WHEEL_ID);
			if (!wheel) return;
			const microtaskNodes = wheel.querySelectorAll(`.${MICROTASK_CLASS}`);
			const macrotaskNode = wheel.querySelector(
				`.${MACROTASK_CLASS}`
			) as SVGUseElement;
			const renderNode = wheel.querySelector(
				`.${RENDER_CLASS}`
			) as SVGUseElement;

			if (!macrotaskNode || !renderNode || !microtaskNodes) return;
			renderNode.style.fill = render
				? colors.render.enabled
				: colors.render.disabled;
			macrotaskNode.style.fill = macrotask
				? colors.macrotask.enabled
				: colors.macrotask.disabled;
			microtaskNodes.forEach((node) => {
				(node as SVGUseElement).style.fill = microtask
					? colors.microtask.enabled
					: colors.microtask.disabled;
			});
		});
	}, []);

	return (
		<Styled.CircleContainer>
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
					fill={colors.pointer}
					transform={`rotate(${POINTER_OFFSET})`}
				/>
				<circle id="wheel" cx="0" cy="0" r="97" fill={colors.wheel} />

				<use
					href="#segment"
					className={MICROTASK_CLASS}
					fill={colors.microtask.disabled}
					transform={`rotate(${SEGMENT_OFFSET - 30})`}
				/>
				<use
					href="#segment"
					className={RENDER_CLASS}
					fill={colors.render.disabled}
					transform="rotate(-9)"
				/>
				<use
					href="#segment"
					className={MICROTASK_CLASS}
					fill={colors.microtask.disabled}
					transform={`rotate(${SEGMENT_OFFSET + 30})`}
				/>

				<use
					href="#segment"
					className={MICROTASK_CLASS}
					fill={colors.microtask.disabled}
					transform={`rotate(${SEGMENT_OFFSET + 150})`}
				/>
				<use
					href="#segment"
					className={MACROTASK_CLASS}
					fill={colors.macrotask.disabled}
					transform={`rotate(${SEGMENT_OFFSET + 180})`}
				/>
				<use
					href="#segment"
					className={MICROTASK_CLASS}
					fill={colors.microtask.disabled}
					transform={`rotate(${SEGMENT_OFFSET + 210})`}
				/>

				<circle
					id="center-mock-outer"
					cx="0"
					cy="0"
					r="73"
					fill={colors.background}
				/>
				<path
					id={POINTER_BOTTOM_ID}
					d="M 0 0 L 73 0 A 72 72 0 0 1 69.65 22.65 Z"
					fill={colors.pointer}
					transform={`rotate(${POINTER_OFFSET})`}
				/>
				<path
					id={POINTER_LEFT_ID}
					d="M 0 0 L 100 0"
					stroke={colors.pointer}
					strokeWidth="3"
					transform={`rotate(${POINTER_OFFSET})`}
				/>
				<path
					id={POINTER_RIGHT_ID}
					d="M 0 0 L 100 0"
					stroke={colors.pointer}
					strokeWidth="3"
					transform={`rotate(${POINTER_OFFSET + 18})`}
				/>
				<circle
					id="center-mock-inner"
					cx="0"
					cy="0"
					r="70"
					fill={colors.background}
				/>
			</svg>
		</Styled.CircleContainer>
	);
}

export default Wheel;
