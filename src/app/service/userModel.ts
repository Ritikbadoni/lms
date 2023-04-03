import { Timestamp } from "@angular/fire/firestore";

export class UserModel {
  userId!: string;
  authId!: string;
  name!: string;
  email!: string;
  password!:string;
  createdOn!: firebase.default.firestore.Timestamp;
  active!: boolean;
}