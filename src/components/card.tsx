import * as React from 'react';
import { cn } from '@/utils/utils';

interface CardProps {
	text: string;
	className?: string;
}

export function Card({ className, text }: CardProps) {
	return (
		<div
			className={cn(
				'bg-[var(--color-secondary)] border rounded-lg grow',
				className
			)}
		>
			<div className="flex grow h-full items-center justify-center p-2 break-all">
				{text}
			</div>
		</div>
	);
}
