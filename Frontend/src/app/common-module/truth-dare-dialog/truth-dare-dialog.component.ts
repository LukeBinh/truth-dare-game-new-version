import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TruthOrDare } from 'src/app/enum/add-type.enum';
import { PagingRequestModel } from 'src/app/models/paging.model';
import { TruthDareModel } from 'src/app/models/truth-dare.model';
import { TruthDareService } from 'src/app/service/truth-dare.service';

@Component({
    selector: 'app-truth-dare-dialog',
    templateUrl: './truth-dare-dialog.component.html',
    styleUrls: ['./truth-dare-dialog.component.scss'],
})
export class TruthDareDialogComponent implements OnInit {
    isTruthType : boolean = false;
    truthDare: TruthDareModel = new TruthDareModel();

    constructor(@Inject(MAT_DIALOG_DATA) private data: number,
        private truthDareService: TruthDareService ) {}

    ngOnInit(): void {
        this.isTruthType = this.data === TruthOrDare.TRUTH; 
        this.getData();
    }

    getData() { 
        if(this.isTruthType) { 
            this.truthDareService.getRandomTruth().subscribe(res => {
                this.truthDare = res;
            })
        } else { 
            this.truthDareService.getRandomDare().subscribe(res => {
                this.truthDare = res;
            })
        }
    }

}
