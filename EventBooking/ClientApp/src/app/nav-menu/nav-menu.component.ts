import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;
  loggedIn = false;
  constructor( 
    private authenticationService: AuthenticationService
) {
  
}

ngOnInit() { 
  const currentUser = this.authenticationService.currentUserValue;
  if (currentUser) {
      // authorised so return true
      this.loggedIn= true;
  }
}
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout(){
    window.localStorage.clear();
    this.loggedIn= false;
  }
}
