import { useEventLists } from '../../store/store.ts';
import * as Styled from './Callstack.styled.ts';
import InfoIcon from '../InfoIcon/InfoIcon.tsx';
import InfoModal from '../Modal/Modal.tsx';
import useBoolean from '../../utils/useBoolean.tsx';

function CallStack() {
	const tasks = useEventLists((state) => state.callstack);
	const [open, setOpen, setClose] = useBoolean(false);

	return (
		<Styled.Callstack>
			<InfoIcon onClick={setOpen} />
			{tasks.map(({ display: stack }) => (
				<Styled.CallstackElement key={stack}>{stack}</Styled.CallstackElement>
			))}
			<InfoModal isOpen={open} onClose={setClose}>
				<h2>Call stack</h2>
				<Styled.CloseIcon onClick={setClose} />
				<p>
					A call stack is a mechanism for an interpreter to keep track of its
					place in a script that calls multiple functions — what function is
					currently being run and what functions are called from within that
					function, etc.
				</p>
				<ul>
					<li>
						When a script calls a function, the interpreter adds it to the call
						stack and then starts carrying out the function.
					</li>
					<li>
						Any functions that are called by that function are added to the call
						stack further up, and run where their calls are reached.
					</li>
					<li>
						When the current function is finished, the interpreter takes it off
						the stack and resumes execution where it left off in the last code
						listing.
					</li>
					<li>
						If the stack takes up more space than it was assigned, a "stack
						overflow" error is thrown.
					</li>
				</ul>
			</InfoModal>
		</Styled.Callstack>
	);
}

export default CallStack;
