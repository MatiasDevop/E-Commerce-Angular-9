import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new Subject<User>();
  private apiUrl= '/api/auth/';

  constructor(private httpClient: HttpClient) { }
  login(email: string, password: string){

    const loginCredentials = {email, password};
    console.log('Login creadentials', loginCredentials);



    return this.httpClient.post<User>(`${this.apiUrl}login`,
    loginCredentials).pipe(
      switchMap(
        foundUser =>{
          this.setUser(foundUser);
          console.log(`User found`, foundUser);
          return of(foundUser);
        }
      ),
      catchError(e => {
        console.log(`Your login details could not be verified. Please try again`, e );
        return throwError(`Your login details could notbe verified. Please try again`);
      })
    )
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
    return this.httpClient.post<User>(`${this.apiUrl}register`, user).pipe
    (
      switchMap(savedUser => {
        this.setUser(savedUser);
        console.log(`user registerd successfully`, savedUser);
        return of(savedUser)
      }),
      catchError(e=>{
        console.log(`server error occured`, e);
        return throwError(`Registration failed please contact to admin`);
      })
    )

    // //Make a Api call to save user in db
    // // update the user subject
    // this.setUser(user);

    // console.log(`Registered user successfully`, user);
    // return of(user);
  }

  private setUser(user){
    this.user$.next(user);
  }
}
