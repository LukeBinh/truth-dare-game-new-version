import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AddType } from 'src/app/enum/add-type.enum';
import { PagingRequestModel } from 'src/app/models/paging.model';
import { PlayerModel } from 'src/app/models/player.model';
import { TruthDareModel } from 'src/app/models/truth-dare.model';
import { PlayerService } from 'src/app/service/player.service';
import { TruthDareService } from 'src/app/service/truth-dare.service';

@Component({
    selector: 'app-add-edit-truth-dare-player',
    templateUrl: './add-edit-truth-dare-player.component.html',
    styleUrls: ['./add-edit-truth-dare-player.component.scss'],
})
export class AddEditTruthDarePlayerComponent implements OnInit {
    name: string = '';
    @ViewChild('inputName') inputName: ElementRef;
    displayedColumns = ['name', 'action'];
    dataSource: any = [];
    totalRecord = 0;
    pageType: string | null;
    placeHolder = '';
    addType = AddType;
    isLoading: boolean = false;
    playerList: PlayerModel[] = [
        {
            id: this.getNewID() + '1',
            name: 'Bình 1',
            color: '#ffc3a0'
        },
        {
            id: this.getNewID() + '2',
            name: 'Bình 2',
            color: '#6dd5ed'
        },
        {
            id: this.getNewID() + '3',
            name: 'Bình 3',
            color: '#753a88'
        },
        {
            id: this.getNewID() + '4',
            name: 'Bình 4',
            color: '#ffdde1'
        },
    ]
    buttonDisabled: boolean = false;

    constructor(private playerService: PlayerService,
        private route: ActivatedRoute,
        private router: Router,
        private truthDareService: TruthDareService) {}

    ngOnInit(): void {
        this.pageType = this.route.snapshot.paramMap.get('type');
        if(this.pageType === AddType.ADD_PLAYER) {
            this.placeHolder = 'Add Player'
            this.getPlayer();
        } else if (this.pageType === AddType.ADD_TRUTH) {
            this.placeHolder = 'Add Truth'
            this.getTruth();
        } else { 
            this.placeHolder = 'Add Dare'
            this.getDare();
        }
    }

    getPlayer() { 
        this.isLoading = true;
        this.dataSource = this.playerService.getPlayer();
        if(!this.dataSource || !this.dataSource.length) { 
            this.dataSource = this.playerList;
            this.playerService.addMutiplePlayers(this.playerList);
        }
        this.totalRecord = this.dataSource.length;
        this.buttonDisabled = this.dataSource.length < 4;
        this.isLoading = false;
    }

    

    getTruth(pageEvent?: PageEvent) { 
        this.isLoading = true;
        const request: PagingRequestModel = new PagingRequestModel();
        if(pageEvent) {
            request.pageIndex = pageEvent.pageIndex;
            request.pageSize = pageEvent.pageSize
        }
        this.truthDareService.getTruthsPaging(request).subscribe(res => {
            this.dataSource = res.pageData;
            this.totalRecord = res.totalCount
            this.isLoading = false;            
        });
    }

    getDare(pageEvent?: PageEvent) { 
        this.isLoading = true;
        const request: PagingRequestModel = new PagingRequestModel();
        if(pageEvent) {
            request.pageIndex = pageEvent.pageIndex;
            request.pageSize = pageEvent.pageSize
        }
        this.truthDareService.getDaresPaging(request).subscribe(res => {
            this.dataSource = res.pageData;
            this.totalRecord = res.totalCount
            this.isLoading = false;
        })
    }

    add() {         
        if(!this.name) return;
        this.name = this.name.trim();
        if(this.pageType === AddType.ADD_PLAYER) {
            this.addPlayer();
        } else if (this.pageType === AddType.ADD_TRUTH) {
            this.addTruth();
        } else { 
            this.addDare();
        }
        this.name = '';
        this.inputName.nativeElement.focus();
    }

    remove(item: any) { 
        if(this.pageType === AddType.ADD_PLAYER) {
            this.removePlayer(item);
        } else if (this.pageType === AddType.ADD_TRUTH) {
            this.removeTruth(item);
        } else { 
            this.removeDare(item);
        }
       
    }

    addPlayer() { 
        const player: PlayerModel = {
            id: this.getNewID(),
            name: this.name
        }
        this.playerService.addPlayer(player);
        this.getPlayer();
    }

    removePlayer(player: PlayerModel) { 
        this.playerService.removePlayer(player);
        this.getPlayer();
    }

    addTruth() { 
        const truth: TruthDareModel = {
            question: this.name
        }
        this.truthDareService.addTruth(truth).subscribe(res => {
            this.getTruth();
        })
    }

    removeTruth(truth: TruthDareModel) { 
        this.truthDareService.removeTruth(truth).subscribe(res => {
            this.getTruth();
        })
    }

    addDare() { 
        const truth: TruthDareModel = {
            question: this.name
        }
        this.truthDareService.addDare(truth).subscribe(res => {
            this.getDare();
        })
    }

    removeDare(dare: TruthDareModel) { 
        this.truthDareService.removeDare(dare).subscribe(res => {
            this.getDare();
        })
    }

    handlePageEvent(e: PageEvent) {
        if(this.pageType === AddType.ADD_TRUTH) { 
            this.getTruth(e);
        }else if (this.pageType === AddType.ADD_DARE) {
            this.getDare(e);
        }
    }

    getNewID() {
        const myDate = new Date();
        let varID = myDate.getHours() + "" + myDate.getMinutes() + "" + myDate.getSeconds() + "" + myDate.getMilliseconds();
        if (varID.length > 15) {
            varID = varID.substr(0, 15);
        }
        return varID;
    }

    navigateToPlayPage() { 
        if(this.dataSource.length) { 
            this.router.navigate(['/play']);
        }
    }
}
