import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new Subject<User>();
  constructor() { }
  login(email: string, password: string){

    const loginCredentials = {email, password};
    console.log('Login creadentials', loginCredentials);
    return of(loginCredentials);
  }
  
  logout(){
    //Remove user from subject
    this .setUser(null);
    console.log('user did logout succesfull');

  }
  get user() {
    return this.user$.asObservable();
  }

  register(user: any){
    //Make a Api call to save user in db
    // update the user subject
    this.setUser(user);

    console.log(`Registered user successfully`, user);
    return of(user);
  }

  private setUser(user){
    this.user$.next(user);
  }
}
