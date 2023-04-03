import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged } from '@angular/fire/auth';
import { getDocs } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { collection, Firestore, getFirestore } from '@firebase/firestore';
import { DBService } from 'src/app/db.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private db :DBService, private authService :AuthService ) {
     console.log('yes');
     
     
   }

  fetchAdmin(){
    this.authService.checkDetails();
  
    }

  ngOnInit(): void {
   
  }

}

