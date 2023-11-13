import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddType } from 'src/app/enum/add-type.enum';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    addType = AddType;
    isAdmin = environment.server?.isAdmin;

    constructor(private router: Router,
        private authService: AuthService,
        private userStoreService: UserStoreService){}

    ngOnInit(): void {
        // this.authService.adminApi();

        this.userStoreService.getRoleFromStore().subscribe(res => {
            const roleFromToken = this.authService.getRoleFromToken();
            this.isAdmin = (res.toLowerCase() || roleFromToken.toLowerCase()) === 'admin';
        })  
    }
    

    navigateToAddPage(type: string) { 
        this.router.navigate(['add', type]);
    }
}
