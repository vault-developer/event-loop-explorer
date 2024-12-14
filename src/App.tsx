import StylesProvider from './providers/StylesProvider.tsx';
import Home from './pages/home/Home.tsx';

function App() {
	return (
		<StylesProvider>
			<Home />
		</StylesProvider>
	);
}

export default App;
