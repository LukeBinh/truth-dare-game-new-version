import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AddEditTruthDarePlayerComponent } from './components/add-edit-truth-dare-player/add-edit-truth-dare-player.component';
import { PlayComponent } from './components/play/play.component';

const routes: Routes = [
    {
        path: 'admin',
        canActivate:[AuthGuard],
        loadChildren: () => import('./common-module/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        canActivate:[AuthGuard],
        component: HomeComponent,
    },
    {
        path: 'add/:type',
        canActivate:[AuthGuard],
        component: AddEditTruthDarePlayerComponent,
    },
    {
        path: 'play',
        canActivate:[AuthGuard],
        component: PlayComponent,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
