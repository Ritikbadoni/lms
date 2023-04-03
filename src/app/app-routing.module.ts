import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { FormComponent } from './component/form/form.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuard } from './service/auth.guard';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { FooterComponent } from './component/footer/footer.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, },
  {path: 'manage-book', component: FormComponent,},
  {path: 'profile', component:ProfileComponent,},
  {path: 'admin', component : AdminComponent,},
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent },
  {path: '', component : SignInComponent},
  {path: 'footer', component: FooterComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
