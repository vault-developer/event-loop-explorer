import * as React from 'react';
import { FC, ReactNode } from 'react';
import { WebApiSectionElement } from '@/utils/types';
import { cn } from '@/utils/utils';

type ListElement = WebApiSectionElement | string;

interface ListProps {
	data: ListElement[];
	children: (el: ListElement) => ReactNode;
	orientation: 'horizontal' | 'vertical';
	className?: string;
}

const LIST_CLASSES = {
	horizontal: 'flex gap-4 grow overflow-auto no-scrollbar',
	vertical: 'flex gap-4 grow overflow-auto no-scrollbar md:flex-col ',
};

const LIST_ELEMENT_CLASSES = {
	horizontal: 'flex grow max-w-1/3 min-h-[60]',
	vertical:
		'flex grow max-w-1/3 min-h-[60] md:max-w-full md:min-h-0 md:max-h-1/7',
};

export const List: FC<ListProps> = ({
	data,
	children: render,
	orientation,
	className,
}) => {
	return (
		<div className={cn(LIST_CLASSES[orientation], className)}>
			{data.map((element) => (
				<div
					key={typeof element === 'object' ? element.value : element}
					className={LIST_ELEMENT_CLASSES[orientation]}
				>
					{render(element)}
				</div>
			))}
		</div>
	);
};
