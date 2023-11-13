import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const token = this.authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
        }
        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        return this.handleUnAuthorrizedError(request, next);
                    }
                }
                return throwError(() => new Error('Some other error occured'));
            })
        );
    }

    handleUnAuthorrizedError(req: HttpRequest<any>, next: HttpHandler) {
        const tokenApi = new TokenApiModel();
        tokenApi.accessToken = this.authService.getToken()!;
        tokenApi.refreshToken = this.authService.getRefreshToken()!;
        return this.authService.renewToken(tokenApi).pipe(
            switchMap((data: TokenApiModel) => {
                this.authService.storeToken(data.accessToken);
                this.authService.storeRefreshToken(data.refreshToken);
                req = req.clone({
                    setHeaders: {Authorization: `Bearer ${data.accessToken}`}
                })
                return next.handle(req);
            }),
            // catchError(err => {
            //     return throwError(() => {
            //         this.router.navigate(['login']);
            //     })
            // })
        )
    }
}
