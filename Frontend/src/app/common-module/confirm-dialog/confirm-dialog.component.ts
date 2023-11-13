import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TruthOrDare } from 'src/app/enum/add-type.enum';
import { PlayerModel } from 'src/app/models/player.model';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    player: PlayerModel = new PlayerModel();
    truthOrDare = TruthOrDare;
    constructor(@Inject(MAT_DIALOG_DATA) public data: PlayerModel,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>){

    }

    ngOnInit(): void {
        this.player = this.data;
    }

    confirm(type: number) { 
        this.dialogRef.close(type);
    }
    
}
