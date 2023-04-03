import { Component, OnInit } from '@angular/core';
import { addDoc, collection, getFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../../db.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  errorMsg: string | undefined;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private db : DBService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [ Validators.required, Validators.email ]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  loginUser(form: FormGroup): void {
    // let formValues = { ...form.value };
    delete this.errorMsg;
    this.loader = true;
    let formValues: { email: string; password: string } = { ...form.value };
    
    this.authService.loginUser(formValues)
      .then(() => this.loader = false)
      .catch((error: string | undefined) => {
        this.loader = false;
        this.errorMsg = error;
        setTimeout(() => delete this.errorMsg, 5000)
      });
  }

}
