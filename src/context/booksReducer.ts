import { updateData } from "../database/indexedDb";
import { BooksState } from "../interfaces/books.interface";




type BooksActions = 
	{type: "bookToReadingList", payload: {id: string}} |
	{type: "bookToBooksList", payload: {id:string}} |
	{type: "updateInitialState", payload: {state: BooksState}}
	

export function booksReducer (state:BooksState, action:BooksActions):BooksState {

	let stateReturn;

	switch(action.type){

	case "updateInitialState":
		// to load the state 
		return action.payload.state;


	case "bookToReadingList":
		
		stateReturn = {
			...state,
			library: state.library.filter( (libraryItem)=> (
				libraryItem.book.ISBN !== action.payload.id
			)),
			listReading: [...state.listReading, ...state.library.filter((libraryItem) =>(
				libraryItem.book.ISBN === action.payload.id
			))]

		};
		
		updateData(stateReturn);
		return stateReturn;
	
	case "bookToBooksList":
		stateReturn={
			...state,
			listReading: state.listReading.filter ( libraryItem => (
				libraryItem.book.ISBN !== action.payload.id
			)),
			library : [...state.library, ...state.listReading.filter( libraryItem =>(
				libraryItem.book.ISBN === action.payload.id
			)
				
			)]
		};
		updateData(stateReturn);
		return stateReturn;

	

	default:
		return state;
	}
}