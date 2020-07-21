import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/user';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
    
  user: Observable<User>;
  userSubscription: Subscription;
  constructor(private authService:AuthService, private router:Router) {}
  
  ngOnInit(): void {
      this.user = this.authService.user;
      // WHEN you reload the page this works for keeping the user login
      this.userSubscription = this.authService
        .findMe()
        .subscribe(user => (this.user = user));
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
