import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { EventEditorComponent } from './event-editor/event-editor.component';
import { EventListComponent } from './event-list/event-list.component';


const routes: Routes = [
  {path:"", component: EventListComponent,},
  
  { path: 'editor/:id', component: EventEditorComponent },
  { path: 'editor', component: EventEditorComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventDetailsRoutingModule { }
