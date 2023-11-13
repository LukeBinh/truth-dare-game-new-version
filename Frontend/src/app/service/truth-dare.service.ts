import { Injectable } from '@angular/core';
import { PagingRequestModel } from '../models/paging.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TruthDareModel } from '../models/truth-dare.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.serivce';
import { EnumerablePage } from '../models/enumerable-page.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TruthDareService extends BaseService {

    constructor(public override http: HttpClient) {
        super(http);
    }

    addTruth(request: TruthDareModel): Observable<any> { 
        return this.post('truth', request);
    }

    removeTruth(request: TruthDareModel): Observable<any> { 
        return this.delete(`truth/${request.id}`);
    }

    getTruthsPaging(request: PagingRequestModel): Observable<EnumerablePage<TruthDareModel>> {  
        return this.get(`truth/paging`, request);
    }

    addDare(request: TruthDareModel): Observable<any> { 
        return this.post('dare', request);
    }

    removeDare(request: TruthDareModel): Observable<any> { 
        return this.delete(`dare/${request.id}`);
    }

    getDaresPaging(request: PagingRequestModel): Observable<EnumerablePage<TruthDareModel>> { 
        return this.get(`dare/paging`, request);
    }

    public getRandomDare(): Observable<TruthDareModel>{
        return this.get('dare/random-question');
    }

    public getRandomTruth(): Observable<TruthDareModel>{
        return this.get('truth/random-question')
    }

}
