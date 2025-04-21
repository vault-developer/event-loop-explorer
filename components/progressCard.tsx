import * as React from 'react';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useTimeStore } from '@/store/store';

interface ProgressCardProps {
	text: string;
	className?: string;
	start: number;
	end: number;
}

export function ProgressCard({
	className,
	text,
	start,
	end,
}: ProgressCardProps) {
	const delay = end - start;
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const checkProgress = () => {
			const remainingTime = end - useTimeStore.getState().time;
			const progressPercentage = Math.trunc((remainingTime / delay) * 100);
			const newProgress = Math.max(0, Math.min(progressPercentage, 100));
			setProgress(newProgress);

			if (newProgress > 0) {
				setTimeout(checkProgress, 250);
			}
		};
		checkProgress();
	}, []);

	return (
		<div
			className={`relative flex items-center p-1 flex-1 rounded-lg`}
			style={{
				backgroundImage: `conic-gradient(
          currentColor,
          currentColor ${progress}%,
          transparent ${progress}%
        )`,
			}}
		>
			<div
				className={cn(
					'bg-[var(--color-secondary)] border rounded-lg grow h-full',
					className
				)}
			>
				<div className="flex grow h-full items-center justify-center p-2 break-all">
					{text}
				</div>
			</div>
		</div>
	);
}
