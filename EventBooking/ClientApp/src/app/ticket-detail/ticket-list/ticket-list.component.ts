import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { TicketModel, User } from "../../models"; 
import { AlertService, AuthenticationService, TicketService } from '../../services';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
}) 
  export class TicketListComponent implements OnInit {

    public _list: TicketModel[] = null;
    currentUser=  null;
    constructor(
      private _service: TicketService,
      private router: Router, 
      private authenticationService: AuthenticationService,
      private alertService: AlertService) { }
  
    ngOnInit() {
        
      this.currentUser = this.authenticationService.currentUserValue;
      this._service.getAllByUserId(this.currentUser.user.id).subscribe(
        item => {
          this._list=item;
        }
      )
    }
    _Deails(id){ 
      this.router.navigate(['ticket/editor',  id])
    
    }
  
  }