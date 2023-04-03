import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule } from '@angular/fire/compat';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './component/form/form.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './component/profile/profile.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AdminComponent } from './component/admin/admin.component';
import { AuthGuard } from './service/auth.guard';
import { FooterComponent } from './component/footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    AdminComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
 
    
    

   }

 }
