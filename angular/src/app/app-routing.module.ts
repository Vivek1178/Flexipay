import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { HomeComponent } from './auth/components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RechargePlansComponent } from './modules/customer/components/recharge-plans/recharge-plans.component';
import { PaymentGatewayComponent } from './auth/components/payment-gateway/payment-gateway.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"register", component:SignupComponent},
  {path:"login" , component:LoginComponent},
  {path:"admin", loadChildren:()=> import("./modules/admin/admin.module").then(m => m.AdminModule)},
  {path:"customer", loadChildren:()=> import("./modules/customer/customer.module").then(m => m.CustomerModule)},
  {path:"recharge-plans", component:RechargePlansComponent},
  {path:"payment-gateway", component:PaymentGatewayComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
