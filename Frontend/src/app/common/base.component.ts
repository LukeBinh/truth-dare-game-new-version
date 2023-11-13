import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BaseComponent implements OnDestroy {
    ngUnsubcribe = new Subject<void>();

    ngOnDestroy(): void {
        if(this.ngUnsubcribe) {
            this.ngUnsubcribe.next();
            this.ngUnsubcribe.complete();
        }
    } 

}