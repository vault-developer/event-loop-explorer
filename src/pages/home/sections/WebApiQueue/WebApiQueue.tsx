import WebApiTask from './WebApiTask.tsx';
import * as Styled from './WebApiQueue.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import WebApiQueueModal from './WebApiQueue.modal.tsx';
import { useQueueManagerStore } from 'store/store.ts';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';
import { BaseSection } from 'pages/home/sections/BaseSection/BaseSection.tsx';

function WebApiQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.webApi);
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<BaseSection className={className} title={'Web Api'}>
			<Styled.WebApiQueue>
				<Styled.InfoButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.InfoButton>
				{tasks.map((task) => (
					<WebApiTask key={task.value} task={task} />
				))}
				<WebApiQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.WebApiQueue>
		</BaseSection>
	);
}

export default WebApiQueue;
