import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  signOut(){

    this.authservice.signoutCurrentUser();

  }


  constructor(private authservice : AuthService) {

   }

  ngOnInit(): void {
  }

}

