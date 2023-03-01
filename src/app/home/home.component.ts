import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DBService } from '../db.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  bookList: any;
  tempImage: any;
  file: any;
  bookForm: any;


  documents : Observable<any[]> | undefined;

  constructor(firestore: AngularFirestore, private db :DBService) { 
    // fetching documents from firestore
    this.fetchBooks();

  }

  async fetchBooks(){

    const firestoreDB = getFirestore(this.db.app);
    const booksCollection = collection(firestoreDB, 'Books');
    const snapshots = await getDocs(booksCollection);
    this.bookList = snapshots.docs.map(doc => doc.data())
    
  }


  ngOnInit(): void {
  }

  
  

}


