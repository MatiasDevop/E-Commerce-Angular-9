import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // this for all child that the cannot be overriden
  // it can increase the perform from your application and it makes reactive and 
  // you dont need to use input() or output()
})
export class LoginComponent implements OnInit {
  // @Input()
  // ErrorMessage;
  email:  string;
  error: BehaviorSubject<string>; // this is gonna convert in observable. html wants to subcribe them 
  password: string;
  constructor(private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.error = new BehaviorSubject('');// here i am instance it the first time
  }
  
  login(){
    this.setError(''); 
    this.authService.login(this.email, this.password)
      .subscribe(s =>  this.router.navigate(['']),
        e => this.setError(e));

  }

  private setError(msg: any) {
    return this.error.next(msg);
  }
}
