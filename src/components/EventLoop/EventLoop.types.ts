import { TooltipProps } from '@mui/material';

export interface EventInterface {
	title: string;
	longTitle: string;
	type: 'task' | 'microtask' | 'render';
	degree: number;
	placement: TooltipProps['placement'];
}
