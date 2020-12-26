import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../../services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
}) 
  export class RegisterComponent implements OnInit {
    registerForm: FormGroup; 
    public _User: User = null;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder, 
        private router: Router,
        private _userService: UserService,
        private alertService: AlertService
    ) {
      
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
        });
 
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() { 
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        const _User: User = this.registerForm.value;
        this._userService.register(_User)
            .pipe(first())
            .subscribe(
                data => {
                  
      this.router.navigate(['auth']) ;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

