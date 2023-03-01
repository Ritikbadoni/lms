import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { getFirestore,getDocs , collection, addDoc, setDoc, doc, Timestamp, deleteDoc} from '@firebase/firestore/lite';
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
import { Storage } from '@angular/fire/storage';



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
      bookId : new FormControl(''),
    }
  );

  app = initializeApp(environment.firebase);
  updateMode = false;
  bookdata: any;
  value: any;
  addbook :boolean = true;
  text = "Add Book";
  id : string | null = "";
  tempImage: any = null;
  


  

  constructor(private storage : Storage , private firestore : Firestore, private db : DBService,private route : ActivatedRoute) {
    this.bookData();
  }
    

  async addBook(){
    console.log("function executed");
    let value : any = {...this.bookForm.value};
    
    if(this.bookForm.invalid){
      this.bookForm.markAllAsTouched();
      return;
    }

    let bookInfo = {
      bookId :value.bookId.length === 0? doc(collection(this.firestore, "Books")).id :value.bookId,
      name : value.name,
      author : value.author,
      genre : value.genre,
      price : value.price,
      available : value.available,
      notavailable : value.notavailable,
      imageURL : value.imageURL,
      image : value.image,
    }

    if(this.tempImage != null){
      let strorageRef = ref(this.storage , "Books/" + this.tempImage.name)
      await uploadBytes(strorageRef, this.tempImage);
      bookInfo.image = await getDownloadURL(strorageRef);
      alert (bookInfo.image);
      
    }

    let docRef = doc(this.firestore , "Books/" + bookInfo.bookId);
    setDoc (docRef, bookInfo)
    .then(() => {
      alert("saved");
      this.bookForm.reset({});
    },(error) => {
      console.log(error);
      
    })

    // const firestoreDB = getFirestore(this.db.app);
    // const documentToWrite = doc(collection(firestoreDB, 'Books'));
    // const bookData = this.bookForm.value;
    // console.log("Adding Book with Data:");
    // console.log(bookData);
    // this.bookForm.reset({});
    
    
    // setDoc(documentToWrite, bookData);

  }


  async bookData(){
    const firestoreDB = getFirestore(this.db.app);
    const userCollection = collection(firestoreDB, 'Books');
    const snapshots = await getDocs(userCollection);
    this.bookdata = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(this.bookdata);
    
    
  

  }

   async deleteBook(bookId : string){
    // const firestoreDB = getFirestore(this.db.app);
    // const userCollection = collection(firestoreDB, 'Books');
    // const snapshots = await getDocs(userCollection);
    let docRef = doc (this.firestore, "Books/" + bookId);
    deleteDoc(docRef).then(()=>{
      console.log("deleted successfully");
    })
    .catch((error) =>{
      console.log(error);
      
    })
    
  }

  book(){
    this.text = "Add Book"
  }

  updateBook(data : any){
    this.text= "Update Book"
    let datepipe = new DatePipe('en-US');
    this.bookForm = new FormGroup({
      bookId : new FormControl(data.bookId),
      name : new FormControl(data.name),
      image : new FormControl(data.image),
      author : new FormControl(data.author),
      genre : new FormControl(data.genre),
      price : new FormControl(data.price),
      available : new FormControl(data.available),
      notavailable : new FormControl(data.notavailable),
      imageURL : new FormControl(data.imageURL),
    });
    
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
 



}