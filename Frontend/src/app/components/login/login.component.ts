import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';
import { mergeNewSetting } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm = new FormGroup({ 
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    })

    userData: UserModel = new UserModel();

    constructor(private router: Router, 
        private authService: AuthService,
        private userStoreService: UserStoreService){
    }

    onSubmit() { 
        this.authService.login(this.loginForm.value).subscribe(res => {
            if(res) { 
                console.log(res);
                this.authService.storeToken(res.accessToken);
                this.authService.storeRefreshToken(res.refreshToken);
                const tokenPayload = this.authService.decodeToken();
                this.userStoreService.setFullNameForStore(tokenPayload.name);
                this.userStoreService.setRoleForStore(tokenPayload.role);
                this.router.navigate(['home']);
            }
        })

    }
}
