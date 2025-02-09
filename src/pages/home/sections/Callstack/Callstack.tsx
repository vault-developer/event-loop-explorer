import * as Styled from './Callstack.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import CallStackModal from './Callstack.modal.tsx';
import { useQueueManagerStore } from 'store/store.ts';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';
import { BaseSection } from 'pages/home/sections/BaseSection/BaseSection.tsx';

function CallStack({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.callstack);
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<BaseSection className={className} title={'CallStack'}>
			<Styled.Callstack>
				<Styled.InfoButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.InfoButton>
				{tasks.map((task) => (
					<Styled.CallstackElement key={task}>{task}</Styled.CallstackElement>
				))}
				<CallStackModal isOpened={isOpened} toggle={toggle} />
			</Styled.Callstack>
		</BaseSection>
	);
}

export default CallStack;
