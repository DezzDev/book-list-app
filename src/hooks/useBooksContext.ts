import { BooksContext } from "../context/BooksContext";
import { useContext } from "react";

export function useBooksContext (){
	const context = useContext(BooksContext);

	if(!context){
		throw new Error("useBooksContext debe ser utilizado dentro de un BookProvider");
	}
	return context;
}