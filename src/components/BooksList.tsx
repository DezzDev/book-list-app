import { ChangeEvent, useEffect, useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { Book } from "./Book";






export function BooksList() {

	console.log("bookList");
	const {
		booksState,
		bookToReadingList,
		listReadingCount,
		booksListCount
	} = useBooksContext();

	const { library } = booksState;




	// get genres of library
	const genres = Array.from(new Set(library.map(libraryItem => libraryItem.book.genre))).sort((a, b) => a.localeCompare(b));
	
	console.log({genres});
	

	// to store the result of filter
	const [libraryFiltered, setLibraryFiltered] = useState(library);
	// to store valueToFilter
	const [valueToFilter, setValueToFilter] = useState("All");
	// booksFilterCount
	const [booksFilterCount, setBooksFilterCount] = useState(library.length);

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		// set valueToFilter
		setValueToFilter(e.target.value);
	};

	// update libraryFiltered when library change, valueToFilter Change or when create the component
	useEffect(() => {

		console.log("useEffect");
		// if select all or empty option return all books
		if (valueToFilter === "All") {
			setLibraryFiltered(library);

			return;
		}

		// set library by genre
		setLibraryFiltered(library.filter(libraryItem => libraryItem.book.genre === valueToFilter));

	}, [library, valueToFilter]);

	useEffect(() => {
		console.log("useEffect libraryFilter");
		setBooksFilterCount(libraryFiltered.length);
	}, [libraryFiltered]);

	//setBooksListCount(libraryFiltered.length);


	return (
		<div className="container">
			<h1>{booksListCount} : Books available</h1>
			<h3>{listReadingCount} : On the Reading List</h3>

			{/* filtro */}

			<div className="mb-1">
				<select name="filterByGenre" id="filterByGenre" onChange={handleSelectChange}>
					<option value="All">All</option>
					{
						genres.map((genre, index) => (
							<option key={index} value={genre}>{genre}</option>
						))
					}
					
				</select>

				{
					valueToFilter === "All" ? <span></span> : <span className="ml-1">{booksFilterCount} Books find</span>
				}
			</div>

			{/* books list */}

			<div className="booksContainer">
				{
					libraryFiltered.map((libraryItem) => (
						<span
							key={libraryItem.book.ISBN}
							onClick={() => { bookToReadingList(libraryItem.book.ISBN); }}
						>
							<Book position="" book={libraryItem.book} />

						</span>

					))
				}

			</div>
		</div>
	);
}
