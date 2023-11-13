import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';



@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    mode: ProgressSpinnerMode = 'indeterminate';
    color: ThemePalette = 'primary';
    value = 50;
}
