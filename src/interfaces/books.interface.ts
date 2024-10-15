interface Author{
	name: string,
	otherBooks: string[]
}

export interface Book{
	title : string,
	pages: number,
	genre: string,
	cover: string,
	synopsis: string,
	year: number,
	ISBN: string,
	author: Author
}

interface LibraryItem {
	book: Book
}

export interface Library{
	library: LibraryItem[]
}

export interface ListReading{
	listReading:LibraryItem[]
}

// props of booksContext
export interface BooksContextProps{
	booksState: BooksState,
	bookToReadingList : (id:string)=>void,
	bookToBooksList : (id:string)=>void,
	booksListCount : number,
	listReadingCount: number
	
	
	
}

// general state of app
export interface BooksState{
	library: LibraryItem[],
	listReading: LibraryItem[]
}

