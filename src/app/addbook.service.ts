import { Injectable } from '@angular/core';
import { Book } from './model/book';
@Injectable({
  providedIn: 'root'
})
export class AddbookService {

  books: Book[] = [
    new Book("doglapan","Ashneer grover" ,"autobiography", 399 ),
    new Book("harry potter","j.k rowllins" ,"fiction", 799 ),
    new Book("team of rivals","doris kearns goodwin" ,"history", 2910 ),
    new Book("lagoon","ruskin bond" ,"litrature", 599 ),
    new Book("doglapan","Ashneer grover" ,"autobiography", 399 ),


  ];

  constructor() { }

  getbooks(){
    return this.books;
  }

 
  addbooks(){
    
  }

}
