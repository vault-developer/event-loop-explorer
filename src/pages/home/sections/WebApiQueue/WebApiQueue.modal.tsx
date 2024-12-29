import * as Styled from './WebApiQueue.styled.ts';
import InfoModal from 'components/Modal/Modal.tsx';

function WebApiQueueModal({
	isOpened,
	toggle,
}: {
	isOpened: boolean;
	toggle: () => void;
}) {
	return (
		<InfoModal isOpened={isOpened} onClose={toggle}>
			<h2>Web API</h2>
			<Styled.CloseIcon onClick={toggle} />
			<p>
				Web APIs extend the capabilities of JavaScript in web browsers, allowing
				access to device hardware, operating system features, and more complex
				browser functions.
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
	);
}

export default WebApiQueueModal;
