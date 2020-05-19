import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { TokenStorageService } from '../token-storage.service';
import { read } from 'fs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor {

  constructor(private tokenStorage:TokenStorageService) { }
  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
    ): Observable<import("@angular/common/http").HttpEvent<any>> {
    const token = this.tokenStorage.getToken();
    const cloneRequest = req.clone({
      headers: req.headers.set(
        'Authorization', token? `Bearer ${token}`: ""
      )
    });
    return next.handle(cloneRequest); 
  }
}
