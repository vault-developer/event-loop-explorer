import { JSX, PropsWithChildren } from 'react';
import { BaseSection } from 'pages/home/sections/BaseSection/BaseSection.tsx';
import useBoolean from 'utils/hooks/useBoolean.ts';
import * as Styled from './BaseModalSection.styled.ts';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';
import InfoModal from 'components/Modal/Modal.tsx';

export function BaseModalSection({
	title,
	children,
	modalContent,
	className,
}: PropsWithChildren<{
	title: string;
	className?: string;
	modalContent: JSX.Element;
}>) {
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<BaseSection className={className} title={title}>
			<Styled.InfoButton onClick={toggle}>
				<Icon variant={'info'} color={theme.custom.com.icon.background} />
			</Styled.InfoButton>
			<InfoModal isOpened={isOpened} onClose={toggle}>
				<Styled.CloseButton onClick={toggle}>
					<Icon variant={'close'} color={theme.custom.com.icon.background} />
				</Styled.CloseButton>
				{modalContent}
			</InfoModal>
			{children}
		</BaseSection>
	);
}
