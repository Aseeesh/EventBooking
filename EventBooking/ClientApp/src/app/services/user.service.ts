import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from "../../environments/environment";

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _apiURL =env.base_API_Url;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this._apiURL+ "users/");
    }

    register(user: User) { 
        return this.http.post(this._apiURL+ 'auth/register', user);
    }

    delete(id: number) {
        return this.http.delete(this._apiURL+ "users/"+id);
    }
}