import { ThemeToggle } from './themeToggle';
import { Repeat, Github } from 'lucide-react';
import { Button } from '@/components/chadcdn/button';
import Link from 'next/link';

export function Header() {
	return (
		<div className="flex px-4 py-2 lg:px-6 lg:py-4 items-center justify-between border-b">
			<div className="flex items-center gap-2">
				<Repeat />
				<h2>Event loop explorer</h2>
			</div>

			<div className="flex items-center gap-2">
				<Button asChild variant="ghost" size="iconBig">
					<Link href="https://event-loop-explorer.vercel.app" target="_blank">
						<Github className="size-6" />
					</Link>
				</Button>
				<ThemeToggle />
			</div>
		</div>
	);
}
