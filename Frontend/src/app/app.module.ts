import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './common-module/confirm-dialog/confirm-dialog.component';
import { TruthDareDialogComponent } from './common-module/truth-dare-dialog/truth-dare-dialog.component';
import { AddEditTruthDarePlayerComponent } from './components/add-edit-truth-dare-player/add-edit-truth-dare-player.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlayComponent } from './components/play/play.component';
import { AngularFireModule } from '@angular/fire/compat';
import { LoadingModule } from './common-module/loading/loading.module';
import { TokenInterceptor } from './interceptor/token.interceptor';

const firebaseConfig = {
    apiKey: 'AIzaSyC6exh-igbaJrd2o-7BbUNVm23w3dZd6fo',
    authDomain: 'truth-or-dare-76098.firebaseapp.com',
    projectId: 'truth-or-dare-76098',
    storageBucket: 'truth-or-dare-76098.appspot.com',
    messagingSenderId: '436948115731',
    appId: '1:436948115731:web:5b54022a5aa11dafbf3ae6',
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AddEditTruthDarePlayerComponent,
        PlayComponent,
        TruthDareDialogComponent,
        ConfirmDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatDialogModule,
        LoadingModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent],
})
export class AppModule {}
