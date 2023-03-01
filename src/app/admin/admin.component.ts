import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDocs, getFirestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { collection, Firestore } from 'firebase/firestore';
import { DBService } from '../db.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  

  constructor(private db :DBService, private firestore :Firestore) {


  
  }



 ngOnInit( ) : void {
  //  this.formModal = new window.bootstrap.Modal(
  //   document.getElementById("exampleModal")
  //  )
    
  }
}