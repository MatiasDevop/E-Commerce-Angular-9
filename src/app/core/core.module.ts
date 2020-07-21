import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { throwIfAlreadyLoaded } from './utils/module-import-guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptorService } from './interceptors/auth-header-interceptor.service';
import { SharedModule } from '../shared/shared.module';
import { HttpErrorInterceptorService } from './interceptors/http-error-interceptor.service';

// here we brought Providers form appModule to core never imported multiples times
@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule {

  // this config is because it can not be imported multiple times
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
