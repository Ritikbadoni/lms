import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { getFirestore, getDocs, collection, addDoc, setDoc, doc, Timestamp, deleteDoc, updateDoc } from '@firebase/firestore';
import { getStorage, ref, uploadBytes } from '@firebase/storage';
import { DBService } from '../db.service';
import { getDownloadURL } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseApp } from '@firebase/app';
import { initializeApp } from 'firebase/app'
import { environment } from 'src/environments/environment';
import { docData, onSnapshot, Firestore  } from '@angular/fire/firestore';
import { ActivatedRoute, Data } from '@angular/router';
import { CollectionReference, documentId } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { Storage } from '@angular/fire/storage';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {

  bookForm = new FormGroup(
    {
      name: new FormControl(''),
      image: new FormControl(''),
      author: new FormControl(''),
      genre: new FormControl(''),
      price: new FormControl(''),
      available: new FormControl(false),
      notavailable: new FormControl(false),
      imageURL: new FormControl(''),
    }
  );

  app = initializeApp(environment.firebase);
  updateMode: boolean = false;
  bookdata: any;
  value: any;
  addbook: boolean = true;
  text = "Add Book";
  id: string = "docID";
  tempImage: any = null;
  bookList: any[] = [];
  updateBookId: any;
  http: any;
  bookid: any;

  bookInfo: any;





  constructor(private storage: Storage, private firestore: Firestore, private db: DBService, private route: ActivatedRoute,) {
    this.bookData();

  }

  async bookData() {
    const firestoreDB = getFirestore(this.db.app);
    const userCollection = collection(firestoreDB, 'Books');
    const snapshots = await getDocs(userCollection);
    this.bookdata = snapshots.docs.map(
      doc => {
        const data = doc.data();
        data['docId'] = doc.id;
        return data;
      });

    // console.log(this.bookdata);

  }




  async addBook() {
    let value: any = { ...this.bookForm.value };

    let bookInfo = {
      name: value.name,
      author: value.author,
      genre: value.genre,
      price: value.price,
      // bookid :value.docId,
      available: value.available,
      notavailable: value.notavailable,
      image: value.image,
      imageURL: value.imageURL,
    }

    if (this.updateMode){
      console.log(bookInfo);
      // const docRef = doc(this.firestore, 'Books', docId);
      const firestoreDB = getFirestore(this.db.app);
      const documentToWrite =doc(firestoreDB, "Books", this.updateBookId);
      const upadtedInfo = bookInfo
      
      updateDoc(documentToWrite , upadtedInfo);

    } else {
      const firestoreDB = getFirestore(this.db.app);
      const documentToWrite = doc(firestoreDB, 'Books');
      const bookData = this.bookForm.value;
      console.log("Adding Book with Data:");
      this.bookForm.reset({});

      setDoc(documentToWrite, bookData);

    }

  }


  deleteBook(docId: any) {
    console.log("Delete Clicked");
    const firestoreDB = getFirestore(this.db.app);
    deleteDoc(doc(firestoreDB, "Books", docId));
  }

  book() {
    this.updateMode = false;
    this.text = "Add Book"
    
  }

  updateBook(docId: any, index: any) {
    this.text = "Update Book";
    this.updateMode = true;
    console.log(docId);
    this.updateBookId = docId;
    // console.log(this.bookdata[index]);


    this.bookForm.setValue({
      name: this.bookdata[index].name,
      image: this.bookdata[index].image,
      author: this.bookdata[index].author,
      genre: this.bookdata[index].genre,
      price: this.bookdata[index].price,
      available: this.bookdata[index].available,
      notavailable: this.bookdata[index].notavailable,
      imageURL: this.bookdata[index].imageURL,

    })

    // const firestoreDB = getFirestore(this.db.app);
    // const documentToWrite =doc(firestoreDB, "Books", docId);
    // const bookData = this.bookForm.value;
    // console.log(bookData);

    // setDoc(documentToWrite, bookData)
    





  }

  action: String = "";

  ngOnInit(): void {


  }



  saveDataInSession(book: any) {
    this.text = "Update Book"
    console.log(book);
    sessionStorage.setItem("book", JSON.stringify(book))
    console.log("book saved in session storage");
  }




}