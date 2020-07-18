import { Injectable } from '@angular/core';
import { of, Subject, throwError, EMPTY, BehaviorSubject } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { LogService } from '@core/log.service';


interface UserDto {
  user: User;
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<User>(null);
  private apiUrl= '/api/auth/';

  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorageService,
    private logService: LogService) { }

  get isUserLoggedIn() {
    return this.user$.value != null;
  }

  login(email: string, password: string){

    const loginCredentials = {email, password};
    console.log('Login credentials', loginCredentials);

    return this.httpClient.post<UserDto>(`${this.apiUrl}login`,
    loginCredentials).pipe(
      switchMap(({user , token}) => {
          this.setUser(user);
          this.tokenStorage.setToken(token);
          console.log(`User found`, user);
          return of(user);
        }
      ),
      catchError(e => {
        this.logService.log(`Server Error Occurred: ${e.error.message} `, e);
        //replace this for//console.log(`Your login details could not be verified. Please try again`, e );
        return throwError(`Your login details could notbe verified. Please try again`);
      })
    )
  }
  
  logout(){
    //Remove user from subject
    //remove token from localstorage
    this.tokenStorage.removeToken();
    this.setUser(null);
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

  findMe(){
    const token = this.tokenStorage.getToken();
    if (!token) {
      return EMPTY;
    }

    return this.httpClient.get<any>(`${this.apiUrl}findme`)
    .pipe(
      switchMap(foundUser =>{
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

  private setUser(user){
    this.user$.next(user);
  }
}
