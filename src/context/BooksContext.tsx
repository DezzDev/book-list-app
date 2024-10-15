import { createContext } from "react";
import {  BooksContextProps } from "../interfaces/books.interface";



// creamos el contexto con un valor predeterminado
export const BooksContext = createContext<BooksContextProps>({} as BooksContextProps);