import { Header } from '@/features/header/header';
import { Configurator } from '@/features/sections/configurator/configurator';
import { WebApi } from '@/features/sections/webApi';
import { RequestAnimationFrame } from '@/features/sections/requestAnimationFrame';
import { Callstack } from '@/features/sections/callstack';
import { Console } from '@/features/sections/console';
import { TasksQueue } from '@/features/sections/tasksQueue';
import { MicrotasksQueue } from '@/features/sections/microtasksQueue';
import { EventLoop } from '@/features/sections/eventLoop/eventLoop';

export default function App() {
	return (
		<div className="flex flex-col grow min-h-screen">
			<Header />
			<div className="grow grid grid-cols-2 md:grid-cols-5 p-4 gap-4 lg:p-6 lg:gap-6">
				<div className="col-span-2 h-full grid grid-rows-5 gap-4 lg:gap-6">
					<div className="row-span-3 flex overflow-auto">
						<Configurator />
					</div>
					<div className="row-span-1 flex overflow-auto">
						<WebApi />
					</div>
					<div className="row-span-1 flex overflow-auto">
						<RequestAnimationFrame />
					</div>
				</div>
				<div className="col-span-2 md:col-span-1 h-full grid grid-rows-2 gap-4 lg:gap-6">
					<div className="row-span-1 flex overflow-auto">
						<Callstack />
					</div>
					<div className="row-span-1 flex overflow-auto">
						<Console />
					</div>
				</div>
				<div className="col-span-2 h-full grid grid-rows-5 gap-4 lg:gap-6">
					<div className="row-span-1 flex overflow-auto">
						<TasksQueue />
					</div>
					<div className="row-span-1 flex overflow-auto">
						<MicrotasksQueue />
					</div>
					<div className="row-span-3 flex overflow-auto">
						<EventLoop />
					</div>
				</div>
			</div>
		</div>
	);
}
