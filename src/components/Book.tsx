import { Book } from "../interfaces/books.interface";
import "./book.css";

interface props {
	book:Book,
	position:string
}

export function Book ({book, position}:props){

	

	return (
		
		<div className={`book ${position}` } >
			<img src={book.cover} alt={book.title} />
		</div>

		
	);
}