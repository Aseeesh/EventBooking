import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { CategoryModel, User } from "../../models"; 
import { AlertService, AuthenticationService, CategoryService } from '../../services';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
}) 
  export class CategoryListComponent implements OnInit {

    public _list: CategoryModel[] = null;
    currentUser: User=null;
    constructor(
      private _service: CategoryService,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) { }
  
    ngOnInit() {
       if (!this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    this.currentUser = this.authenticationService.currentUserValue.user; 
      this._service.getAll().subscribe(
        item => {
          this._list=item;
        }
      )
       
    }
    _Deails(id){ 
      this.router.navigate(['category/editor',  id])
    
    }
  
  }
  