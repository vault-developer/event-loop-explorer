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
		<div
			data-testid="info-container"
			className={cn(
				'bg-[var(--color-card)] border rounded-lg p-2 lg:p-4 grow flex flex-col gap-2 lg:gap-4 max-w-full min-h-[10vh] md:min-h-0',
				className
			)}
		>
			<div className="flex items-center justify-between gap-2">
				<h3>{title}</h3>
				<Modal title={title} description={description}>
					<Button
						variant="ghost"
						size="iconSmall"
						data-testid="info-container-button"
					>
						<Info className="size-5" />
					</Button>
				</Modal>
			</div>
			{children}
		</div>
	);
}
