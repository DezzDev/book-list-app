import { useBooksContext } from "../hooks/useBooksContext";
import { Book } from "./Book";

export function ListReading (){
	const {booksState, bookToBooksList} = useBooksContext();
	const listReading = booksState.listReading;
	
	return(
		<div className="container-list-reading">
			<h2 className="mb-2 mt-2">ReadingList</h2>
			<div className="list-reading">
				{
					listReading.map(libraryItem => (
						<span 
							className="bookContainer"
							key={libraryItem.book.ISBN} 
							onClick={()=>{bookToBooksList(libraryItem.book.ISBN);}}
						>
							<Book 
								position="book-of-reading-list"
								book={libraryItem.book} 
							/>

						</span>
					))
				}

			</div>
		</div>
	);
}