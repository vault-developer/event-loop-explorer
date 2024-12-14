import { useEventLists } from '../../../../store/store.ts';
import WebApiTask from './WebApiTask.tsx';
import * as Styled from './WebApiQueue.styled.ts';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import InfoModal from '../../../../components/Modal/Modal.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';
import { Zoom } from '@mui/material';

function WebApiQueue() {
	const tasks = useEventLists((state) => state.web_api);
	const [open, setOpen, setClose] = useBoolean(false);

	return (
		<Styled.WebApiQueue>
			<InfoIcon onClick={setOpen} />
			{tasks.map((task) => (
				<Zoom in key={task.serialize() + task.node.start}>
					<WebApiTask task={task} />
				</Zoom>
			))}
			<InfoModal isOpen={open} onClose={setClose}>
				<h2>Web API</h2>
				<Styled.CloseIcon onClick={setClose} />
				<p>
					Web APIs extend the capabilities of JavaScript in web browsers,
					allowing access to device hardware, operating system features, and
					more complex browser functions.
				</p>
				<p style={{ marginTop: 12 }}>Examples:</p>
				<ul style={{ marginTop: 8 }}>
					<li>DOM API: For manipulating web page content and structure</li>
					<li>Fetch API: For making HTTP requests</li>
					<li>Web Storage API: For storing data in the browser</li>
					<li>Geolocation API: For accessing device location</li>
					<li>Canvas API: For drawing graphics</li>
					<li>Web Audio API: For processing and synthesizing audio</li>
				</ul>
			</InfoModal>
		</Styled.WebApiQueue>
	);
}

export default WebApiQueue;
