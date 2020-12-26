import { Component, OnInit } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CategoryModel } from "../../models"; 
import * as moment  from 'moment';
import { AlertService, AuthenticationService, CategoryService } from '../../services';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.css']
}) 
  export class CategoryEditorComponent implements OnInit { 
    public _form: FormGroup = null;
    public _model: CategoryModel = null;
    loading = false;
    currentUser=null;
    submitted = false;
    returnUrl: string; 
    date: {year: number, month: number};
    constructor(  
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router, 
        private authenticationService: AuthenticationService,
        private _service: CategoryService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // if (this._service.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }
   
    ngOnInit() {
      
    this.currentUser = this.authenticationService.currentUserValue;
      
      this.route.params.subscribe(params => {
        this._form = this.formBuilder.group({
          id:[0],
          name: ['', Validators.required],
            description: ['', Validators.required],
            noOfSeats: [0, Validators.required],
            // eventDate:[this.calendar.getToday()]
        });
        let id = +params['id'];
        if (id != null && id>0) {
          this._service.getById(id).subscribe(
            item => {
              this._form.patchValue({
                id: item.id,
                name: item.name, 
                description: item.description,
                noOfSeats:item.noOfSeats,
                // eventDate:item.eventDate
              })
              
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
    get f() { return this._form.controls; }
  
    onSubmit() { 
        this.submitted = true;
  
        // reset alerts on submit
        this.alertService.clear();
  
        // stop here if form is invalid
        if (this._form.invalid) {
            return;
        }
        this.returnUrl="category";
        const _model: CategoryModel = this._form.value;
        
     //   _model.=moment().format('YYYY-MM-DD HH:mm:ss');  
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
