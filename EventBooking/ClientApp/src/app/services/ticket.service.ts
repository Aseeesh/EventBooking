import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from "../../environments/environment";

import { TicketModel, User } from '../models';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService {
    private _apiURL =env.base_API_Url+ "TicketDetail/";
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<TicketModel[]>(this._apiURL+'getall');
    }
    getById(id) {
        return this.http.get<TicketModel>(this._apiURL+'get/'+id);
    }
   getAllByUserId(id) {
        return this.http.get<TicketModel[]>(this._apiURL+'getAllByUserId/'+id);
    }

    getByEventId(id) {
        return this.http.get<TicketModel[]>(this._apiURL+'GetTicketsByEvent/'+id);
    }
    
    AddUpdate(event: TicketModel) {
        debugger
   const URL = encodeURI(this._apiURL+'create/');
        
      var currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
 //const headers = new HttpHeaders() .set('Authorization', 'Bearer ' +currentUserSubject.value.token);
            
      return  this.http.post(URL, JSON.stringify(event) ,{ headers, responseType: 'text', observe: 'response' })
     
    }
   
    delete(id: number) {
        return this.http.delete(this._apiURL+id);
    }
}