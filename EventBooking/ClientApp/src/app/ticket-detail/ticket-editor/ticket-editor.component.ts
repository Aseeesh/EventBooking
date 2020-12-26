import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EventModel, TicketModel } from "../../models"; 
import * as moment  from 'moment';
import { AlertService, AuthenticationService, TicketService,EventService } from '../../services';

@Component({
  selector: 'app-ticket-editor',
  templateUrl: './ticket-editor.component.html',
  styleUrls: ['./ticket-editor.component.css']
}) 
  export class TicketEditorComponent implements OnInit { 
    public ticketForm: FormGroup = null;
    public _model: TicketModel = null;
    
  selectedEvent:EventModel; 
    loading = false; 
    currentUser=null;
    submitted = false;
    disabled=false;
    returnUrl: string; 
    date: {year: number, month: number};
  eventData$:  EventModel[];
  ticketDetails$:TicketModel[];
    constructor(  
       // private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,  
        private _service: TicketService,
        private eventService:EventService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
    ) {
        // redirect to home if already logged in
        // if (this._service.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }
     getEventDetails(){
       if(this.selectedEvent.id>0){
       this._service.getByEventId(this.selectedEvent.id).subscribe(
        item => {
          this.ticketDetails$=item;
        //  this.eventData$=item  ;
        }
      ) 
       }
      
      }
      selectSeat(item){
        debugger
      }
    ngOnInit() {
 
      this.currentUser = this.authenticationService.currentUserValue;
      this.eventService.getAll().subscribe(
        item => {
          this.eventData$=item  ;
        }
      )
    
   
      this.route.params.subscribe(params => {

        
        // this.ticketForm = this.formBuilder.group({
        //   id:[0], 
        //   name: ['', Validators.required],
        //     description: ['', Validators.required],
        //     title: ['', Validators.required],
        //     // eventDate:[this.calendar.getToday()]
        // });

        // let id = +params['id'];
        // if (id != null && id>0) {
        //   this._service.getById(id).subscribe(
        //     item => {
             
              
        //     },
        //     err => {
        //       console.log(err);
        //     },
        //   )
        // }
        let eventId = +params['eventId'];
        if (eventId != null && eventId>0) {
          this._service.getByEventId( eventId).subscribe(
            item => {
              this.ticketDetails$=item;
            //  this.eventData$=item  ;
            }
          ) 
        }
      }, error => {
        console.log(JSON.stringify(error));
      });
   
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.ticketForm.controls; }
  
    onSubmit( form,item) { 
       
        this.submitted = true;
  
        // reset alerts on submit
        this.alertService.clear();
  
        // stop here if form is invalid
        if (this.ticketForm.invalid ||item.description=='Occupied') {
            return;
        }
        
        this.returnUrl="ticket";
        const _model: TicketModel  =null;
      
        _model.eventDetailId= item.eventDetailId;
        _model.seatId= item.seatId;
        _model.userId= this.currentUser.user.id; 
        _model.description='Occupied';
        this.loading = true;  
          this._service.AddUpdate(_model)
          .pipe(first())
          .subscribe(
              data => { 
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
        
       
    }
  
  }
