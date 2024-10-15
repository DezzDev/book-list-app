
import { Book, BooksState, Library, ListReading } from "../interfaces/books.interface";

if (!window.indexedDB) {
	window.alert(
		"Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas",
	);
	
}


export function updateData(booksState: BooksState){
	// open o create dataBase
	const request: IDBOpenDBRequest = window.indexedDB.open("booksListDB",1);

	request.onupgradeneeded = (event:Event) => {
		console.log("onupgradeneeded");
		const db = (event.target as IDBOpenDBRequest).result;

		// create an objectStore to hold information about our booksList
		// going to use "isbn" as our key path
		const createBooksListObjectStore = db.createObjectStore("booksList", {
			autoIncrement:true
		});

		// create an index to search books by ISBN 
		createBooksListObjectStore.createIndex("ISBN","ISBN", {unique:true});

		// create an objectStore to hold information about our readingList
		// going to use "isbn" as our key path
		const createReadingListObjectStore = db.createObjectStore("readingList", {
			autoIncrement: true
		});

		// create an index to search books by ISBN 
		createReadingListObjectStore.createIndex("ISBN","ISBN", {unique:true});
	};



	request.onsuccess =(event:Event) =>{
		console.log("onsuccess");

		const db = (event.target as IDBOpenDBRequest).result;

		const transaction = db.transaction(["booksList", "readingList"],"readwrite");
		
		const bookListOS = transaction.objectStore("booksList");
		const readingListOS = transaction.objectStore("readingList");

		bookListOS.clear();
		readingListOS.clear();


		booksState.library.forEach(itemLibrary =>{
			bookListOS.add(itemLibrary.book);
		});


		booksState.listReading.forEach(itemLibrary => {
			readingListOS.add(itemLibrary.book);
		});

	};

	request.onerror=(event: Event) =>{
		console.error("error:", (event.target as IDBOpenDBRequest).error);
	};

}

export function getData():Promise<BooksState>{
	
	return new Promise((resolve, reject)=>{
		const request = indexedDB.open("booksListDB", 1);

		request.onupgradeneeded =(event : Event)=>{
			const db = (event.target as IDBOpenDBRequest).result;

			// create an objectStore to hold information about our booksList
			// going to use "isbn" as our key path
			const createBooksListObjectStore = db.createObjectStore("booksList", {
				autoIncrement:true
			});

			// create an index to search books by ISBN 
			createBooksListObjectStore.createIndex("ISBN","ISBN", {unique:true});

			// create an objectStore to hold information about our readingList
			// going to use "isbn" as our key path
			const createReadingListObjectStore = db.createObjectStore("readingList", {
				autoIncrement: true
			});

			// create an index to search books by ISBN 
			createReadingListObjectStore.createIndex("ISBN","ISBN", {unique:true});
			
		};
		
		request.onsuccess = (event : Event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			// init 1ª transaction
			const transactionBooksList = db.transaction("booksList","readonly");
			const booksListOS = transactionBooksList.objectStore("booksList");

			const booksListCursorRequest = booksListOS.openCursor();
			const booksListArray : Library={
				library:[]
			};

			booksListCursorRequest.onsuccess=(event:Event)=>{
				const booksListCursor = (event.target as IDBRequest<IDBCursorWithValue>).result;

				// check if have elements
				if(booksListCursor){
					const data = booksListCursor.value as Book;
					booksListArray.library.push({book:data});

					booksListCursor.continue();
				}else{
					// get all elements of first objectStore
					console.log("get all elements of first objectStore");
					// close transaction of first objectStore
					transactionBooksList.abort();

					// init 2ª transaction 
					const readingListTransaction = db.transaction("readingList","readonly");
					const readingListOS = readingListTransaction.objectStore("readingList");

					const readingListCursorRequest = readingListOS.openCursor();
					const readingListArray: ListReading={
						listReading: []
					};

					readingListCursorRequest.onsuccess = (event:Event) =>{
						const readingListCursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
						
						// check if have elements
						if(readingListCursor){
							const data = readingListCursor.value as Book;
							readingListArray.listReading.push({book:data});

							readingListCursor.continue();
						}else{
							//get all elements of second objectStore
							console.log("get all elements of second objectStore");

							//close second transaction
							readingListTransaction.abort();

							// close connection
							db.close();

							// resolve promise
							resolve({library:booksListArray.library, listReading:readingListArray.listReading});
						}

					};

					readingListCursorRequest.onerror=(event:Event)=>{
						console.error("Error to open cursor of second objectStore", (event.target as IDBRequest).error);
						reject((event.target as IDBRequest).error);
					};

				}

			};

			booksListCursorRequest.onerror=(event:Event)=>{
				console.error("Error to open cursor of first objectStore ", (event.target as IDBRequest).error);
				reject((event.target as IDBRequest).error);
			};

		};

		request.onerror = (event : Event )=>{
			console.error("Error to open dataBase ", (event.target as IDBRequest).error);
			reject((event.target as IDBOpenDBRequest).error);
		};
	});	

}



