import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseService {
    constructor(public http: HttpClient){

    }

    protected get(url: string, params: any = {}, headers?: HttpHeaders): Observable<any>{
        return this.http.get(this.resolveBaseUrl() + url, {headers: headers , params: params})
    }

    protected post(url: string, data: any = {}, headers?: HttpHeaders): Observable<any> {
        return this.http.post(this.resolveBaseUrl() + url, data, { headers: headers });
    }

    protected put(url: string, data: any = {}, headers?: HttpHeaders): Observable<any> {
        return this.http.put(this.resolveBaseUrl() + url, data, {headers: headers});
    }

    protected delete(url: string, headers?: HttpHeaders): Observable<any>{
        return this.http.delete(this.resolveBaseUrl() + url, {headers: headers});
    }

    public resolveBaseUrl(): string {
        return environment.apiUrl;
    }
}
