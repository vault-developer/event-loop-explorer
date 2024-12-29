import * as Styled from './Configurator.styled.ts';
import { BaseLayoutElement } from '../../Home.styled.ts';
import Controls from './Controls/Controls.tsx';
import Editor from './Editor/Editor.tsx';
import { codeExamples } from './Configurator.data.tsx';
import { useState } from 'react';

export default function Configurator({ className }: { className?: string }) {
	const [text, setText] = useState(codeExamples[3].code);

	return (
		<BaseLayoutElement className={className}>
			<Styled.SectionWrapper>
				<Controls text={text} setText={setText} />
				<Editor text={text} setText={setText} />
			</Styled.SectionWrapper>
		</BaseLayoutElement>
	);
}
