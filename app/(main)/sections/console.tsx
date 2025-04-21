import { FC } from 'react';
import { InfoContainer } from '@/components/infoContainer';
import { Card } from '@/components/card';
import { List } from '@/components/list';
import { useQueueManagerStore } from '@/store/store';

const description = (
	<>
		<p>
			The browser console is a built-in tool within web browsers that allows
			developers and users to view and interact with a web page&apos;s internal
			state.
		</p>
		<p>
			It provides a way to examine error messages, debug JavaScript code, and
			monitor network activity, ultimately helping with troubleshooting and
			development.
		</p>
	</>
);

export const Console: FC = () => {
	const logs = useQueueManagerStore((state) => state.console);

	return (
		<InfoContainer title="Console" description={description}>
			<List data={logs} orientation="vertical">
				{(el) => <Card text={el as (typeof logs)[0]} />}
			</List>
		</InfoContainer>
	);
};
