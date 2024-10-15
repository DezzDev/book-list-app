import {BooksList} from "./components/BooksList.tsx";
import { BookProvider } from "./context/BooksProvider.tsx";
import "./App.css";
import { ListReading } from "./components/ListReading.tsx";


function App() {

	
	

	return (
		<BookProvider>
			<div className="layout">
				<BooksList />

				<ListReading />

			</div>
		</BookProvider>
	);
}

export default App;
