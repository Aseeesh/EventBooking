import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { EventModel, User } from "../../models"; 
import { AlertService, AuthenticationService, EventService } from '../../services';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  public _EventList: EventModel[] = null;
  currentUser: User=null;
  constructor(
    private eventService: EventService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
     if (!this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  this.currentUser = this.authenticationService.currentUserValue.user; 
    this.eventService.getByAllId(this.currentUser.id).subscribe(
      item => {
        this._EventList=item;
      }
    )
  }
  eventDeails(id){ 
    this.router.navigate(['event/editor',  id])
  
  }

}
