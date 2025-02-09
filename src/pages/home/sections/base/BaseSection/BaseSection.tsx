import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { BaseLayoutElement } from '../BaseLayoutElement/BaseLayoutElement.tsx';

export const Section = styled(BaseLayoutElement)`
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap: 20px;
	overflow: auto;
	position: relative;
`;

export function BaseSection({
	title,
	children,
	className,
}: PropsWithChildren<{ title: string; className?: string }>) {
	return (
		<Section className={className}>
			<span>{title}</span>
			{children}
		</Section>
	);
}
