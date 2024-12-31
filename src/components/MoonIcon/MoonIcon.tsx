import * as Styled from './MoonIcon.styled.ts';
import { useTheme } from '@emotion/react';

function MoonIcon({
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
			width="20"
			height="20"
		>
			<path
				d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
				stroke={textColor}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Styled.Sun>
	);
}

export default MoonIcon;
