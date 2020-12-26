import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketDetailRoutingModule } from './ticket-detail-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketEditorComponent } from './ticket-editor/ticket-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [TicketListComponent, TicketEditorComponent],
  imports: [
    CommonModule,
    FormsModule, NgSelectModule,
    ReactiveFormsModule,
    TicketDetailRoutingModule
  ]
})
export class TicketDetailModule { }
