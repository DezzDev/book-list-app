import { useEffect, useReducer } from "react";
import { booksReducer } from "./booksReducer";
import { BooksContext } from "./BooksContext";
import {  BooksContextProps, BooksState } from "../interfaces/books.interface";
import books from "../books.json";
import { getData } from "../database/indexedDb";


interface props {
	children : JSX.Element | JSX.Element[]
}

let INITIAL_STATE : BooksState = {library: [], listReading: []};

export function BookProvider ({children} : props) {

	const [booksState, dispatch] = useReducer(booksReducer, INITIAL_STATE);


	useEffect(()=>{
		const initialStateAsync = async()=>{
			try {
				
				// get data of indexedDB
				const data: BooksState = await getData();

				if (data.library.length === 0 && data.listReading.length ===0 ){
					INITIAL_STATE = {
						library : books.library,
						listReading : []
					};
					// update the state of reducer		
					dispatch({type:"updateInitialState", payload: {state:INITIAL_STATE}});
				}else{
					INITIAL_STATE = {
						library: data.library,
						listReading: data.listReading
					}; 
					// update the state of reducer
					dispatch({type:"updateInitialState", payload: {state:INITIAL_STATE}});
				}
			} catch (e) {
				console.error("Error: " , e);
			}
		};

		initialStateAsync().catch(e => {console.error("Error: ", e);});
	},[]);
	

	const bookToReadingList = (id:string) =>{
		dispatch({type:"bookToReadingList", payload:{id: id}});
	};

	const bookToBooksList = (id:string) => {
		dispatch({type:"bookToBooksList", payload: {id: id}});
	};

	

	// set contextValue
	const contextValue: BooksContextProps ={
		booksState,
		bookToReadingList,
		bookToBooksList,
		booksListCount: booksState.library.length,
		listReadingCount: booksState.listReading.length,
		
	};

	return (
		<BooksContext.Provider value={contextValue}>

			{children}
			
		</BooksContext.Provider>
	);
} 