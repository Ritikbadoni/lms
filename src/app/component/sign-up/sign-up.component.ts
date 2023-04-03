import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, getFirestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { documentId, getDocs } from '@firebase/firestore';
import { DBService } from '../../db.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm : FormGroup = new FormGroup({});
  errorMsg: string | undefined;
  loader : boolean = false;
  docID : any

  constructor(private fb : FormBuilder, private authService :AuthService, private db: DBService, private firestore : Firestore) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, [ Validators.required ]],
      email: [null, [ Validators.required, Validators.email ]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      UserId: doc(collection(this.firestore , "user")).id
    });
  }
  
 async onSignup(form: any) {
    delete this.errorMsg;
    this.loader = true;
  
    let formValues = Object.assign({}, form.value);
   await this.authService.registerUser(formValues.email, formValues.password, formValues.name, formValues.UserId)
    
       .then(() => this.loader = false)
       .catch((error) => {
        this.loader = false;
        this.errorMsg = error;
        setTimeout(() => delete this.errorMsg, 5000)
      });
     }

  // onSignup(){
  //   let docRef = doc(this.firestore, "user/" + this.registerForm.value.UserId)
  //   console.log("reached collection");
  //   const userdata = this.registerForm.value;

  //   console.log(userdata);
  //   setDoc(docRef, userdata);
  // }
}

 