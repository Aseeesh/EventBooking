import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment'

import { User, UserData } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserData>;
    public currentUser:  UserData ;

    private _apiURL =env.base_API_Url+ "auth/";
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.value;
    }

    public get currentUserValue(): UserData { 
        return this.currentUserSubject.value;
    }
    private loggedIn = new BehaviorSubject<boolean>(false); // {1}
    get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
    }
    login(username, password) {
        return this.http.post<any>(this._apiURL+'login', { username, password })
        .pipe(map(user => {
            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            
            return user;
        }), 
            catchError(err => {
                console.log('caught mapping error and rethrowing', err);
                return throwError(err);
            }),
            catchError(err => {
                console.log('caught rethrown error, providing fallback value' +err);
                return of([]);
            })
        )
         
           
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}