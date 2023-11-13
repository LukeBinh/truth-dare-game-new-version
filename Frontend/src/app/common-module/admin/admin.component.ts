import { AbstractType, Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Observable, debounceTime, map, pipe, switchMap, take, takeUntil, tap, timer } from 'rxjs';
import { AdminService } from './admin-service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { BaseComponent } from 'src/app/common/base.component';

const valaidateMatchedControlsValue = (
    firstControlName: string,
    secondControlName: string
) => {
    return function (formGroup: FormGroup): ValidationErrors | null {
        const { value: firstControlValue } = formGroup.get(
            firstControlName
        ) as AbstractControl;
        const { value: secondControlValue } = formGroup.get(
            secondControlName
        ) as AbstractControl;
        return firstControlValue === secondControlValue
            ? null
            : { valueNotMatch: { firstControlValue, secondControlValue } };
    };
};

const checkUserNameDuplicated = (api: AdminService) => {
    return (control: AbstractControl) : Observable<ValidationErrors | null> => {
        return timer(500).pipe(
            switchMap(() => api.checkUserDuplicated(control.value).pipe(
                map(isvalid => isvalid ? {usernameDuplicated: true} : null)
            ))
        )
    }
}

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends BaseComponent implements OnInit {
    emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    signUpForm = this.fb.group(
        {
            userName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(32),
                ],
                checkUserNameDuplicated(this.adminService)
            ],
            email: [
                '',
                [Validators.required, Validators.pattern(this.emailRegex)],
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                    ),
                ],
            ],
            confirmPassword: '',
            role: ['', Validators.required]
        },
        {
            validator: valaidateMatchedControlsValue(
                'password',
                'confirmPassword'
            ),
        }
    );

    constructor(private fb: FormBuilder, private adminService: AdminService,
        private authService: AuthService) {
            super();
    }

    ngOnInit(): void {
     
    }


    onSubmit() {
        this.authService.registerUser(this.signUpForm.value).pipe(takeUntil(this.ngUnsubcribe))
            .subscribe(res => {
                console.log(res);
            })
        // console.log(this.signUpForm.value)
    }
}
