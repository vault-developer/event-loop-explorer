import { MIN_DESKTOP_WIDTH } from './constants';

export const isMobile = () => window.innerWidth < MIN_DESKTOP_WIDTH;
