import Home from './pages/home/Home.tsx';
import { StylesProvider } from './styles/styles.provider.tsx';

function App() {
	return (
		<StylesProvider>
			<Home />
		</StylesProvider>
	);
}

export default App;
