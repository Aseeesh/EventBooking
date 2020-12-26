import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth-details/auth.guard';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    // EventDetailsModule,
    // AuthDetailsModule,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,NgbModule,NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: "auth", 
      loadChildren: () => import('./auth-details/auth-details.module').then(m => m.AuthDetailsModule)
   //   , canActivate: [AuthGuard],
     },
       { path: "event", 
     loadChildren: () => import('./event-details/event-details.module').then(m => m.EventDetailsModule)
      , canActivate: [AuthGuard],
    },
    { path: "category", 
    loadChildren: () => import('./category-detail/category-detail.module').then(m => m.CategoryDetailModule)
     , canActivate: [AuthGuard],
   },
   { path: "ticket", 
   loadChildren: () => import('./ticket-detail/ticket-detail.module').then(m => m.TicketDetailModule)
   , canActivate: [AuthGuard],
  },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
