import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryDetailRoutingModule } from './category-detail-routing.module'; 
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ CategoryEditorComponent, CategoryListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryDetailRoutingModule
  ]
})
export class CategoryDetailModule { }
