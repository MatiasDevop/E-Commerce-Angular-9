import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/user';
import { Subscription, Observable, merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    
  user$: Observable<User>;
 
  constructor(private authService:AuthService, private router:Router) {}
  
  ngOnInit(): void {
     this.user$ = merge(this.authService.findMe(), this.authService.user);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
