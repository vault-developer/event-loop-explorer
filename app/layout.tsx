import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './(styles)/globals.css';
import './(styles)/typography.css';
import './(styles)/ace-editor.css';
import './(styles)/utilities.css';
import { ThemeProvider } from 'next-themes';

const nunito = Nunito({
	variable: '--font',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Event Loop Explorer',
	description: 'Simulate javascript execution in browser environment',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
			<body className={`${nunito.variable} antialiased flex`}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
