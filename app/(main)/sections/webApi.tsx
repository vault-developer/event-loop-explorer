import { FC } from 'react';
import { InfoContainer } from '@/components/infoContainer';
import { List } from '@/components/list';
import { useQueueManagerStore } from '@/store/store';
import { WebApiSectionElement } from '@/utils/types';
import { ProgressCard } from '@/components/progressCard';

const description = (
	<>
		<p>
			Web APIs extend the capabilities of JavaScript in web browsers, allowing
			access to device hardware, operating system features, and more complex
			browser functions.
		</p>
		<ul>
			<li>- DOM API: For manipulating web page content and structure</li>
			<li>- Fetch API: For making HTTP requests</li>
			<li>- Web Storage API: For storing data in the browser</li>
			<li>- Geolocation API: For accessing device location</li>
			<li>- Canvas API: For drawing graphics</li>
			<li>- Web Audio API: For processing and synthesizing audio</li>
		</ul>
	</>
);

export const WebApi: FC = () => {
	const webApi = useQueueManagerStore((state) => state.webApi);

	return (
		<InfoContainer title="Web API" description={description}>
			<List data={webApi} orientation="horizontal">
				{(el) => {
					const { value, start, end } = el as WebApiSectionElement;
					return <ProgressCard text={value} start={start} end={end} />;
				}}
			</List>
		</InfoContainer>
	);
};
