import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CategoryModel, EventModel } from "../../models";
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as moment  from 'moment';

import { AlertService, AuthenticationService, EventService,CategoryService } from '../../services';
 
const categoryList=[
  {id:1,name:"category first",noOfSeats:20,description:"standard"},
  {id:2,name:"category second",noOfSeats:25,description:"silver"},
  {id:3,name:"category third",noOfSeats:30,description:"golden"},
  {id:4,name:"category fourth",noOfSeats:35,description:"supernova"},
]
@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit { 
  public eventForm: FormGroup = null;
  public _Event: EventModel = null;
  selectedCategory:number; 
  loading = false;
  currentUser=null;
  submitted = false;
  returnUrl: string;
  model: NgbDateStruct;
  date: {year: number, month: number};
  categoryData$: any;
  constructor( 
    private calendar: NgbCalendar,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router, 
      private categoryService:CategoryService,
      private authenticationService: AuthenticationService,
      private eventService: EventService,
      private alertService: AlertService
  ) {
      // redirect to home if already logged in
      // if (this.eventService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
  ngOnInit() {
    
  this.currentUser = this.authenticationService.currentUserValue;
  this.categoryService.getAll().subscribe(
    item => {
      this.categoryData$=item .map(x=>{
            return  {id:x.id,name:x.name+"  ( capacity: "+x.noOfSeats+")", noOfSeats:x.noOfSeats,description:x.description};
          })
    }
  )

    this.route.params.subscribe(params => {
      this.eventForm = this.formBuilder.group({
        id:[0],
        name: ['', Validators.required],
          description: ['', Validators.required],
          title: ['', Validators.required],
          eventCategory:['', Validators.required],
          // eventDate:[this.calendar.getToday()]
      });
      let id = +params['id'];
      if (id != null && id>0) {
        this.eventService.getById(id).subscribe(
          item => {
            this.eventForm.patchValue({
              id: item.id,
              name: item.name,
              title: item.title,
              description: item.description,
             eventCategoryId:item.eventCategoryId
              
              // createdBy:item.createdBy.id,
              // eventDate:item.eventDate
            })
            if(item.eventCategoryId>0){
           this.selectedCategory=   this.categoryData$.filter(function (x) {
                return x.id === item.eventCategoryId;
              })[0];
               
            }
             
          },
          err => {
            console.log(err);
          },
        )
      }
    }, error => {
      console.log(JSON.stringify(error));
    });

    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
  }
      // get return url from route parameters or default to '/'
     // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.eventForm.controls; }

  onSubmit() { 
      this.submitted = true;
      // reset alerts on submit
      this.alertService.clear();

      const _Event: EventModel = this.eventForm.value;
//debugger
      // stop here if form is invalid
      if (this.eventForm.invalid) {
          return;
      }
      this.returnUrl="event";
      this.loading = true; 
      _Event.createdBy= this.currentUser.user.id; 
      _Event.eventCategoryId=_Event.eventCategory.id;
        _Event.eventDate=moment().format('YYYY-MM-DD HH:mm:ss');   
        this.eventService.AddUpdate(_Event)
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
