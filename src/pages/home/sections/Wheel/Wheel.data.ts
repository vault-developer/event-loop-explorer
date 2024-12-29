import { EventInterface } from './Wheel.types.ts';

export const events: EventInterface[] = [
	{
		title: 'R',
		longTitle: 'Render step',
		type: 'render',
		degree: 0,
		placement: 'right',
	},
	{
		title: 'T',
		longTitle: 'Task step',
		type: 'macrotask',
		degree: 180,
		placement: 'left',
	},
	{
		title: 'mT',
		longTitle: 'Microtask step',
		type: 'microtask',
		degree: 330,
		placement: 'right-start',
	},
	{
		title: 'mT',
		longTitle: 'Microtask step',
		type: 'microtask',
		degree: 210,
		placement: 'left-start',
	},
	{
		title: 'mT',
		longTitle: 'Microtask step',
		type: 'microtask',
		degree: 150,
		placement: 'left-end',
	},
	{
		title: 'mT',
		longTitle: 'Microtask step',
		type: 'microtask',
		degree: 30,
		placement: 'right-end',
	},
];
