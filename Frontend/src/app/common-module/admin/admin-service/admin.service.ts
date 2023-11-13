import { Injectable } from "@angular/core";
import { Observable, from, of } from "rxjs";
import { BaseService } from "src/app/service/base.serivce";

@Injectable({
    providedIn: 'root'
})

export class AdminService extends BaseService {

    public adminApi(): Observable<any> {
        return this.get('admin')
    } 

    public checkUserDuplicated(query: string): Observable<any> {
        return this.get(`admin/${query}`);
    }
}