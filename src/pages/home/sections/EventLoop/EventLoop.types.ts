import { TooltipProps } from '@mui/material';

export interface EventInterface {
	title: string;
	longTitle: string;
	type: 'microtask' | 'macrotask' | 'render';
	degree: number;
	placement: TooltipProps['placement'];
}
