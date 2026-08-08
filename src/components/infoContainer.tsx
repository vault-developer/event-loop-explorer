import * as React from 'react';
import { cn } from '@/utils/utils';
import { Info } from 'lucide-react';
import { Button } from '@/components/chadcdn/button';
import { Modal } from '@/components/modal';
import { ReactNode } from 'react';

interface InfoContainerProps {
	title: string;
	description: ReactNode;
	children: ReactNode;
	className?: string;
}

export function InfoContainer({
	className,
	children,
	description,
	title,
}: InfoContainerProps) {
	return (
		<section
			data-testid="info-container"
			className={cn(
				'bg-card text-card-foreground border border-border/80 rounded-xl p-3 lg:p-4 grow flex flex-col gap-2.5 lg:gap-4 max-w-full min-h-[10vh] md:min-h-0 shadow-[var(--shadow-panel)] transition-[background-color,border-color,box-shadow,color] duration-200',
				className
			)}
		>
			<div className="flex items-center justify-between gap-2">
				<h3 className="text-sm font-semibold tracking-tight lg:text-base">
					{title}
				</h3>
				<Modal title={title} description={description}>
					<Button
						variant="ghost"
						size="iconSmall"
						data-testid="info-container-button"
						className="text-muted-foreground hover:text-foreground"
					>
						<Info className="size-4 lg:size-5" />
					</Button>
				</Modal>
			</div>
			{children}
		</section>
	);
}
