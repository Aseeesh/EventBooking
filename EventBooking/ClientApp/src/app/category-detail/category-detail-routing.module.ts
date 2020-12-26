import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {path:"", component: CategoryListComponent,},
  
  { path: 'editor/:id', component: CategoryEditorComponent },
  { path: 'editor', component: CategoryEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryDetailRoutingModule { }
