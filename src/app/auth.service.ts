import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new Subject<User>();
  private apiUrl= '/api/auth/';

  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService) { }

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

  register(userToSave: any){
    return this.httpClient.post<any>(`${this.apiUrl}register`, userToSave).pipe
    (
      switchMap(({user, token}) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log(`user registerd successfully`, user);
        return of(user)
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

  // findMe(){
  //   const token = this.tokenStorage.getToken();
  //   if (!token) {
  //     return;
  //   }

  //   return this.httpClient.post<User>(`${this.apiUrl}login`,
  //   loginCredentials)
  //   .pipe(
  //     switchMap(
  //       foundUser =>{
  //         this.setUser(foundUser);
  //         console.log(`User found`, foundUser);
  //         return of(foundUser);
  //       }
  //     ),
  //     catchError(e => {
  //       console.log(`Your login details could not be verified. Please try again`, e );
  //       return throwError(`Your login details could notbe verified. Please try again`);
  //     })
  //   )
  // }

  private setUser(user){
    this.user$.next(user);
  }
}
