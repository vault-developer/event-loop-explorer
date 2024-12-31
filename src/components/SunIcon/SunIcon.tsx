import * as Styled from './SunIcon.styled.ts';
import { useTheme } from '@emotion/react';

function SunIcon({
	className,
	onClick,
}: {
	className?: string;
	onClick: () => void;
}) {
	const theme = useTheme();
	const textColor = theme.custom.colors.text;

	return (
		<Styled.Sun
			className={className}
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
		>
			<path
				d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
				stroke={textColor}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Styled.Sun>
	);
}

export default SunIcon;
