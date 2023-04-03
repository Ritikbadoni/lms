import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, user, UserCredential } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, getFirestore, onSnapshot, query, setDoc, Timestamp, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import { UserModel } from './userModel';
import firebase from 'firebase/compat';
import { AdminComponent } from '../component/admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userModel: UserModel | null = null;

  // Various Firebase Auth Error's Code  
  errorCodeMessages: { [key: string]: string } = {
    'auth/user-not-found': 'User not found with this email address',
    'auth/wrong-password': 'Wrong Password. Please enter correct password.',
    'auth/email-already-in-use': 'Email Address already used by another user. Please use different address.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Invalid Email Address',
  }
  user: (() => boolean) | undefined;
  isUserLoggedIn : boolean = false;

  constructor(public auth: Auth,
    private firestore: Firestore ,
    private router: Router,
    private db : DBService) {
      onAuthStateChanged(auth, (user) => {
        if(user !== null) {
          console.log(">>> User is already signed");
          this.isUserLoggedIn = true;
          // this.router.navigate(['/home']);
          this.checkDetails();
          this.fetchUserDetailsFromFirestore(user.uid);
        }else {
          console.log(">>> User is not sign in");
          this.isUserLoggedIn = false;
          this.userModel = null;
        }
      }, (error) => {
        console.log(error);
      })
    }
  
    loginUser({ email, password }: { email: string; password: string }): Promise<UserCredential> {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(this.auth, email, password)
          .then((resp: UserCredential) => {
            this.router.navigate(['/home'])
            this.fetchUserDetailsFromFirestore(resp.user.uid);
            resolve(resp)
          })
          .catch((error) => reject(this.errorCodeMessages[error.code] ?? "Something went Wrong. Please Try Again..."))
      })
    }
    
    registerUser(email: string, password: string, name: string, userId: string): Promise<UserCredential> {
      return new Promise((resolve, reject) =>{
        createUserWithEmailAndPassword(this.auth, email, password)
          .then((resp: UserCredential) => {

            console.log("reached collection");
            let userObj = new UserModel()
            userObj.name = name;
            userObj.authId = resp.user.uid;
            userObj.password = password,
            userObj.active = true;
            userObj.email = email;
            userObj.userId = userId;
            // userObj.createdOn = firebase.firestore.Timestamp.now()
          
        
            let docRef = doc(this.firestore, "user/" + userObj.userId)

            console.log(userObj);
            setDoc(docRef, Object.assign({}, userObj as UserModel));
            // this.saveUserToFirestore({ name, email, password, authId: resp.user.uid });
            resolve(resp)
          })
          .catch((error) => reject(this.errorCodeMessages[error.code] ?? "Something went Wrong. Please Try Again..."))
      })
    }
  
    signoutCurrentUser() {
      this.auth.signOut();
      this.router.navigate(['/signin'])
    }
  
    saveUserToFirestore({name, email, authId, password}: { name: string, email: string, authId: string, password: string }) {
      let userObj = {
        name,
        email,
        authId,
        password,
        userId: doc(collection(this.firestore, "user")).id,
        createdOn: Timestamp.now(),
        active: true
      }
      let docRef = doc(this.firestore, `user/${userObj.userId}`);
      setDoc(docRef, { ...userObj }, { merge: true })
    }
  
    fetchUserDetailsFromFirestore(authId: string) {
      let queryRef = query(
        collection(this.firestore, "user"),
        where("authId", "==", authId)
      );
      
  
      const unsubscribe = onSnapshot(queryRef, (values) => {
        if(values.docs.length === 0) {
      
          unsubscribe();
        } else {
          this.userModel = { ...values.docs[0].data() as UserModel }
        }
      })
     }

     checkDetails(){
      const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    
    if (user) {
      const email =user.email;
      const userData = user.metadata;
      
    } else {
      console.log('Error');
    }
     }

   
  }

