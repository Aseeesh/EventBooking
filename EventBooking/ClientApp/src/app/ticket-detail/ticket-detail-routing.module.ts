import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketEditorComponent } from './ticket-editor/ticket-editor.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
  {path:"", component: TicketListComponent,},
  
  { path: 'editor/:id', component: TicketEditorComponent },
  { path: 'editor', component: TicketEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketDetailRoutingModule { }
