import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDetailsRoutingModule } from './event-details-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EventListComponent, EventEditorComponent],
  imports: [
    CommonModule,
    FormsModule, NgSelectModule,
    ReactiveFormsModule,
    EventDetailsRoutingModule
  ]
})
export class EventDetailsModule { }
