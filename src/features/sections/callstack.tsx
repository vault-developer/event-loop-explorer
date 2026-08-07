import { FC } from 'react';
import { InfoContainer } from '@/components/infoContainer';
import { List } from '@/components/list';
import { Card } from '@/components/card';
import { useQueueManagerStore } from '@/store/store';

const description = (
	<>
		<p>
			A call stack is a mechanism for an interpreter to keep track of its place
			in a script that calls multiple functions — what function is currently
			being run and what functions are called from within that function, etc.
		</p>
		<p>
			When a script calls a function, the interpreter adds it to the call stack
			and then starts carrying out the function.
		</p>
		<p>
			When the current function is finished, the interpreter takes it off the
			stack and resumes execution where it left off in the last code listing.
		</p>
		<p>
			If the stack takes up more space than it was assigned, a &#34;stack
			overflow&#34; error is thrown.
		</p>
	</>
);

export const Callstack: FC = () => {
	const stack = useQueueManagerStore((state) => state.callstack);

	return (
		<InfoContainer title="Callstack" description={description}>
			<List data={stack} orientation="vertical" className="md:flex-col-reverse">
				{(el) => <Card text={el as (typeof stack)[0]} />}
			</List>
		</InfoContainer>
	);
};
