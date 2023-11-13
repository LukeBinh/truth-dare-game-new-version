import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/common-module/confirm-dialog/confirm-dialog.component';
import { TruthDareDialogComponent } from 'src/app/common-module/truth-dare-dialog/truth-dare-dialog.component';
import { Constants } from 'src/app/constants';
import { AddType, TruthOrDare } from 'src/app/enum/add-type.enum';
import { PlayerModel } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/service/player.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
    players: PlayerModel[] = [];
    screenWidth: number;
    playerCoordinates: number;
    skewY: number;
    wheelClassName = '';
    currentRotate = 0;
    truthOrDare = TruthOrDare

    constructor(
        private playerService: PlayerService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.players = this.playerService.getPlayer();
        if(this.players.length < 4) { 
            this.router.navigate([`add/${AddType.ADD_PLAYER}`])
            return;
        }
        this.screenWidth = screen.width - 40;
        this.playerCoordinates = 360 / this.players.length;
        this.skewY = 90 - this.playerCoordinates
        this.players.map((item, index) => {
            item.color =
                Constants.dynamicColor[
                    index as keyof typeof Constants.dynamicColor
                ];
        });
    }

    rotateWheel(currRotate: number, index: number) { 
        const randomPlayer = this.players[index];        
        const wheel = document.querySelector('.wheel') as HTMLElement;
        wheel.style.transform = `rotate(${currRotate - index * this.playerCoordinates - this.playerCoordinates / 2}deg)`;
        wheel.ontransitionend = () => {
            const confirmDialog = this.dialog.open(ConfirmDialogComponent, {data: randomPlayer, width: '300px', disableClose: true});
            confirmDialog.afterClosed().subscribe(res => {
                const truthDareConfig = {data: res, width: '300px'};
                this.dialog.open(TruthDareDialogComponent, truthDareConfig);
            })
        }
    }


    spin() { 
        const randomIndex = Math.floor(Math.random() * this.players.length);
        this.currentRotate += 360 * 10;
        this.rotateWheel(this.currentRotate, randomIndex);        
    }
}
