import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from './user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
    
  user: User;
  userSubscription: Subscription;
  constructor(private authService:AuthService,
    private router:Router){
    
      this.authService.user
        .subscribe(user => {
          (this.user=user);
      });
  }
  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
