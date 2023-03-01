import { Injectable } from '@angular/core';
import {FirebaseApp, initializeApp} from '@firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  app : FirebaseApp;
  currentUser$: any;
  collection: any;

  constructor() {
    this.app = initializeApp(environment.firebase);
    console.log("DB - firebase Initialized");
    
   }
}
