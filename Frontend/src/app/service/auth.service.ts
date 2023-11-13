import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TokenApiModel } from '../models/token-api.model';
import { BaseService } from './base.serivce';
import { RegisterModel } from '../models/login.model';


@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService {
    userPlayload: any

    constructor(public override http: HttpClient) {
        super(http);
        this.userPlayload = this.decodeToken();
    }

    public login(request: any): Observable<TokenApiModel> { 
        return this.post('authentication/login', request);
    }

    public storeToken(tokenValue: string) { 
        localStorage.setItem('token', tokenValue);
    }

    public storeRefreshToken(tokenValue: string){
        localStorage.setItem('refreshToken', tokenValue);
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    public isLoggedIn(): boolean { 
        return !!localStorage.getItem('token');
    }

    public adminApi() {
        this.get('admin').subscribe(res => {
            console.log(res);
        })
    }

    public decodeToken() { 
        const jwtHelper = new JwtHelperService();
        const token = this.getToken()!;        
        return jwtHelper.decodeToken(token);
    }

    public getRoleFromToken() { 
        if(this.userPlayload) return this.userPlayload.role;
    }

    public renewToken(tokenApi: TokenApiModel): Observable<TokenApiModel> { 
        return this.post('authentication/refresh', tokenApi);
    }

    public registerUser(model: RegisterModel): Observable<any> {
        return this.post('authentication', model)
    }
}  
