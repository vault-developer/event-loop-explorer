import Home from './pages/home/Home.tsx';
import { StylesProvider } from 'providers/StylesProvider.tsx';

function App() {
	return (
		<StylesProvider>
			<Home />
		</StylesProvider>
	);
}

export default App;
