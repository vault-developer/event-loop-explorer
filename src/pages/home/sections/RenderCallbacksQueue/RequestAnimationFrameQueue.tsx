import { useEventLists } from '../../../../store/store.ts';
import * as Styled from './RequestAnimationFrameQueue.styled.ts';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import InfoModal from '../../../../components/Modal/Modal.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';
import { Zoom } from '@mui/material';

function RequestAnimationFrameQueue() {
	const callbacks = useEventLists((state) => state.render_callbacks);
	const [open, setOpen, setClose] = useBoolean(false);

	return (
		<Styled.CallbacksQueue>
			<InfoIcon onClick={setOpen} />
			{callbacks.map((callback) => {
				const serialized = callback.serialize();
				const key = serialized + callback.node.start;
				return (
					<Zoom in key={key}>
						<Styled.Callback>{serialized}</Styled.Callback>
					</Zoom>
				);
			})}
			<InfoModal isOpen={open} onClose={setClose}>
				<h2>RequestAnimationFrame</h2>
				<Styled.CloseIcon onClick={setClose} />
				<p style={{ marginBottom: 8 }}>
					The window.requestAnimationFrame() method tells the browser you wish
					to perform an animation. It requests the browser to call a
					user-supplied callback function before the next repaint.
				</p>
				<p style={{ marginBottom: 8 }}>
					The frequency of calls to the callback function will generally match
					the display refresh rate. The most common refresh rate is 60hz, (60
					cycles/frames per second), though 75hz, 120hz, and 144hz are also
					widely used.
				</p>
				<p>
					requestAnimationFrame() calls are paused in most browsers when running
					in background tabs or hidden iframes, in order to improve performance
					and battery life.
				</p>
			</InfoModal>
		</Styled.CallbacksQueue>
	);
}

export default RequestAnimationFrameQueue;
