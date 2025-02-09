import { SunIcon } from 'components/Icon/icons/Sun.tsx';
import { InfoIcon } from 'components/Icon/icons/Info.tsx';
import { CloseIcon } from 'components/Icon/icons/Close.tsx';
import { MoonIcon } from 'components/Icon/icons/Moon.tsx';

export function Icon({
	className,
	color,
	variant,
}: {
	className?: string;
	variant: 'sun' | 'info' | 'close' | 'moon';
	color: string;
}) {
	return {
		sun: <SunIcon color={color} className={className} />,
		info: <InfoIcon color={color} className={className} />,
		close: <CloseIcon color={color} className={className} />,
		moon: <MoonIcon color={color} className={className} />,
	}[variant];
}
