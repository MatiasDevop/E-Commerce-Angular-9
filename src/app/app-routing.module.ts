import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/auth/auth-guard.service';

const routes: Routes = [
        {
          path:'',// this for if this is empty default 
          pathMatch: 'full',
          redirectTo:'products'  
        },
        {
          path:'products',
          pathMatch: 'full',
          loadChildren:  () => import('./products/products.module').then(m => m.ProductsModule)
        },
        {
          path: 'auth',
          loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) //'./auth/auth.module#AuthModule' 
        },
        {
          path: "cart",
          loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
          canActivate: [AuthGuardService]
        }

        // to refactoring we are gonna move on the AuthRouting module
        // {
        //   path:'login',
        //   component:LoginComponent
        // },
        // {
        //   path:'register',
        //   component: RegisterComponent
        // }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  