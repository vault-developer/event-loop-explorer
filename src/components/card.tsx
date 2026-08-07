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
				'bg-secondary border border-border/70 rounded-lg grow animate-in fade-in-0 slide-in-from-bottom-1 duration-200',
				className
			)}
		>
			<div className="flex grow h-full items-center justify-center p-2 break-all text-sm">
				{text}
			</div>
		</div>
	);
}
