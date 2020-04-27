import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(email: string, password: string){

    const loginCredentials = {email, password};
    console.log('Login creadentials', loginCredentials);
    return of(loginCredentials);
  }
}
