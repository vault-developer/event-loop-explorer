import { FC } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/chadcdn/select';
import { Button } from '@/components/chadcdn/button';
import { Play, Pause, Square } from 'lucide-react';
import { Slider } from '@/components/chadcdn/slider';
import { Controls } from '@/store/store.types';
import {
	DEFAULT_EXAMPLE_KEY,
	EXAMPLES,
	EXAMPLES_KEYS,
} from '@/app/(main)/sections/configurator/controls.data';

interface ControlsUiProps {
	status: Controls['status'];
	serialisedSpeed: number;
	speed: number;
	onPlay: () => void;
	onResume: () => void;
	onPause: () => void;
	onStop: () => void;
	onSerialisedSpeedChange: (value: number[]) => void;
	onExampleSelect: (value: string) => void;
}

export const ControlsUi: FC<ControlsUiProps> = ({
	status,
	speed,
	serialisedSpeed,
	onSerialisedSpeedChange,
	onExampleSelect,
	onResume,
	onPlay,
	onPause,
	onStop,
}) => {
	const isIdle = status === 'idle';
	const isPaused = status === 'paused';
	const isRunning = status === 'running';

	return (
		<div className="flex flex-col gap-4 min-h-[38]">
			{isIdle && (
				<div className="flex justify-between items-center gap-2 flex-wrap">
					<Select
						defaultValue={DEFAULT_EXAMPLE_KEY}
						onValueChange={onExampleSelect}
					>
						<SelectTrigger className="w-[210px]">
							<SelectValue placeholder="select an example" />
						</SelectTrigger>
						<SelectContent>
							{EXAMPLES_KEYS.map((key) => (
								<SelectItem key={key} value={key}>
									{EXAMPLES[key].title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						size="sm"
						className="flex items-center gap-1"
						onClick={onPlay}
					>
						<Play />
						RUN
					</Button>
				</div>
			)}
			{isRunning && (
				<div className="flex gap-4 items-center justify-between">
					<div className="flex flex-col gap-2 w-[50%]">
						<div className="text-center">speed: x{speed}</div>
						<Slider
							value={[serialisedSpeed]}
							min={-2}
							max={2}
							step={1}
							onValueChange={onSerialisedSpeedChange}
						/>
					</div>
					<div className="flex gap-4">
						<Button
							size="sm"
							className="flex items-center gap-1"
							onClick={onStop}
						>
							<Square />
							STOP
						</Button>
						<Button
							size="sm"
							className="flex items-center gap-1"
							onClick={onPause}
						>
							<Pause />
							PAUSE
						</Button>
					</div>
				</div>
			)}
			{isPaused && (
				<div className="flex gap-4 items-center justify-between">
					<div className="flex flex-col gap-2 w-[50%]">
						<div className="text-center">speed: x{speed}</div>
						<Slider
							value={[serialisedSpeed]}
							min={-2}
							max={2}
							step={1}
							onValueChange={onSerialisedSpeedChange}
						/>
					</div>
					<div className="flex gap-4">
						<Button
							size="sm"
							className="flex items-center gap-1"
							onClick={onStop}
						>
							<Square />
							STOP
						</Button>
						<Button
							size="sm"
							className="flex items-center gap-1"
							onClick={onResume}
						>
							<Play />
							RESUME
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
