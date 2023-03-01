import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { getFirestore,getDocs, collection, addDoc, setDoc, doc, Timestamp, deleteDoc} from '@firebase/firestore/lite';
import { getStorage, ref, uploadBytes } from '@firebase/storage';
import { DBService } from '../db.service';
import { getDownloadURL } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseApp } from '@firebase/app';
import { initializeApp} from 'firebase/app'
import { environment } from 'src/environments/environment';
import { docData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Data } from '@angular/router';
import { documentId } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {

  bookForm = new FormGroup(
    {
      name : new FormControl(''),
      image: new FormControl(''),
      author : new FormControl(''),
      genre : new FormControl(''),
      price : new FormControl(''),
      available :new FormControl(false),
      notavailable :new FormControl(false),
      imageURL: new FormControl(''),
      id : new FormControl(''),
    }
  );

  app = initializeApp(environment.firebase);
  updateMode = false;
  bookdata: any;
  value: any;
  addbook :boolean = true;
  text = "Add Book";
  update: any;
  id : string | undefined ;
  


  

  constructor(private firestore : AngularFirestore, private db : DBService,private route : ActivatedRoute) {
    this.bookData();
  }
    

  addBook(){

    const firestoreDB = getFirestore(this.db.app);
    const documentToWrite = doc(collection(firestoreDB, 'Books'));
    const bookData = this.bookForm.value;
    console.log("Adding Book with Data:");
    console.log(bookData);
    
    
    setDoc(documentToWrite, bookData);

  }


  async bookData(){
    const firestoreDB = getFirestore(this.db.app);
    const userCollection = collection(firestoreDB, 'Books');
    const snapshots = await getDocs(userCollection);
    this.bookdata = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(this.bookdata);
    
    
  

  }

   async deleteBook(id : any){
    const firestoreDB = getFirestore(this.db.app);
    const userCollection = collection(firestoreDB, 'Books');
    const snapshots = await getDocs(userCollection);
    
    
  }

  book(){
    this.text = "Add Book"
  }

  updateBook(data : any){
    this.text= "Update Book"
    let datepipe = new DatePipe('en-US');
    // this.bookForm = new FormGroup({
    //   name : new FormControl(data.name),
    //   author : new FormControl(data.author),
    //   genre : new FormControl(data.genre),
    //   price : new FormControl(data.price),
    //   available : new FormControl(data.available),
    //   notavailable : new FormControl(data.notavailable),
    // });
    
  }

  action :String="";

 ngOnInit() : void {
  // this.route.queryParams.subscribe(params =>{
  //   this.action = params['action']
  //   if(this.action == 'delete'){

  //     const docID = "";
  //     this.deleteBook(docID);


  //   }else if(this.action == 'update'){//updated
  //     // this.addbook = true;
  //     this.updateMode = true;
  //     this.text = 'Update Book';

  //     const sessionData = sessionStorage.getItem("book");
  //     const bookInfo = JSON.parse(sessionData!);
  //     this.bookForm.patchValue(
  //       {
  //         name : bookInfo.name,
  //         author :bookInfo.author,
  //         genre :bookInfo.genre,
  //         price :bookInfo.price,
  //         available: bookInfo.available,
  //         notavailable: bookInfo.notavailable
  //       }
  //     );

  //     const docID = "";
  //     this.updateBook(docID);


  //   }else{
  //    console.log('do nothing'); 
  //   }
  // });
  } 

  
  
  saveDataInSession(book : any){
    console.log(book);
    sessionStorage.setItem("book", JSON.stringify(book))
    console.log("book saved in session storage");
  }
 

upDate(){
  this.addbook = false;
}

}