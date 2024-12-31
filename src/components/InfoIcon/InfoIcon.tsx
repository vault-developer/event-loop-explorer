import * as Styled from './InfoIcon.styled.ts';

function InfoIcon({
	className,
	onClick,
}: {
	className?: string;
	onClick: () => void;
}) {
	return (
		<Styled.Info
			className={className}
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="20"
			height="20"
		>
			<path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.5,0-8-3.5-8-8s3.5-8,8-8s8,3.5,8,8S16.5,20,12,20z" />
			<rect x="11" y="7" width="2" height="2" />
			<rect x="11" y="11" width="2" height="6" />
		</Styled.Info>
	);
}

export default InfoIcon;
