import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models';
import { EventService } from '../services';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
 
public _EventList: EventModel[] = null; 
  constructor(
    private eventService: EventService,
    private router: Router ) { }
    onSelect(item){
      this.router.navigate(['ticket/editor', { eventId: item.id }])
    }
  ngOnInit() {
     
    this.eventService.getAll().subscribe(
      item => {
        this._EventList=item;
      }
    )
  }
 

}