import * as Styled from './Wheel.styled.ts';
import { useTheme } from '@emotion/react';
import { useTimeStore } from 'store/store.ts';
import { useEffect } from 'react';

const POINTER_TOP_ID = 'wheel-pointer-top';
const POINTER_BOTTOM_ID = 'wheel-pointer-bottom';
const POINTER_LEFT_ID = 'wheel-pointer-left';
const POINTER_RIGHT_ID = 'wheel-pointer-right';

const gradOffset = -99;

function Wheel() {
	const theme = useTheme();

	const colors = {
		pointer: theme.custom.colors.onContainer.contrast,
		wheel: theme.custom.colors.onContainer.dim,
		background: theme.custom.colors.container,
		microtask: theme.custom.colors.primary,
		macrotask: theme.custom.colors.secondary,
		render: theme.custom.colors.tertiary,
	};

	useEffect(() => {
		return useTimeStore.subscribe(({ grad }) => {
			const top = document.getElementById(POINTER_TOP_ID);
			const right = document.getElementById(POINTER_RIGHT_ID);
			const left = document.getElementById(POINTER_LEFT_ID);
			const bottom = document.getElementById(POINTER_BOTTOM_ID);

			const corrected = grad + gradOffset;

			if (top && right && left && bottom) {
				top.style.transform = `rotate(${corrected}deg)`;
				right.style.transform = `rotate(${corrected + 18}deg)`;
				left.style.transform = `rotate(${corrected}deg)`;
				bottom.style.transform = `rotate(${corrected}deg)`;
			}
		});
	}, []);

	return (
		<Styled.CircleContainer>
			<svg
				id="wheel"
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
					transform={`rotate(${gradOffset})`}
				/>
				<circle id="wheel" cx="0" cy="0" r="97" fill={colors.wheel} />

				<use href="#segment" fill={colors.microtask} transform="rotate(-39)" />
				<use href="#segment" fill={colors.render} transform="rotate(-9)" />
				<use href="#segment" fill={colors.microtask} transform="rotate(21)" />

				<use href="#segment" fill={colors.microtask} transform="rotate(141)" />
				<use href="#segment" fill={colors.macrotask} transform="rotate(171)" />
				<use href="#segment" fill={colors.microtask} transform="rotate(201)" />

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
					transform={`rotate(${gradOffset})`}
				/>
				<path
					id={POINTER_LEFT_ID}
					d="M 0 0 L 100 0"
					stroke={colors.pointer}
					stroke-width="3"
					transform={`rotate(${gradOffset})`}
				/>
				<path
					id={POINTER_RIGHT_ID}
					d="M 0 0 L 100 0"
					stroke={colors.pointer}
					stroke-width="3"
					transform={`rotate(${gradOffset + 18})`}
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
