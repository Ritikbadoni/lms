import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, documentId, getDocs, getFirestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { collection, Firestore } from 'firebase/firestore';
import { DBService } from '../db.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup(
    {
      username : new FormControl(''),
      email: new FormControl(''),
      firstname : new FormControl(''),
      lastname : new FormControl(''),
      address : new FormControl(''),
      city :new FormControl(''),
      state :new FormControl(''),
      pincode: new FormControl(''),
      aboutme: new FormControl(''),
      image: new FormControl(''),
      imageURL: new FormControl(''),
    }
  );

  file: any;
  profiledata : any;
  editProfile :boolean = false;
  user$ = this.db.currentUser$;
  bookList : any;
  bookissued : any;
  

  constructor(private db :DBService, private firestore : AngularFirestore) {

    this.fetchData();

   }
  

  uploadImage( ){
    
      
    }


   

  updateProfile(){
    const firestoreDB = getFirestore(this.db.app);
    const documentToWrite = doc(collection(firestoreDB, 'user-profile'));
    const bookData = this.profileForm.value;
    console.log("updating profile");
    console.log(bookData);
    
    
    setDoc(documentToWrite, bookData);


    console.log(this.profileForm.value);

    this.uploadImage();

  };

  async fetchData(){

    const firestoreDB = getFirestore(this.db.app);
    const userCollection = collection(firestoreDB, 'user-profile');
    const snapshots = await getDocs(userCollection);
    this.profiledata = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    console.log(this.profiledata);
    
    this.bookIssued();
    
  };
  
  async bookIssued(){
    

  }




 ngOnInit( ) : void {

    
  };
}  
