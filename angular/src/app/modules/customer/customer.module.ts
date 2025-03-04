import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { RechargePlansComponent } from './components/recharge-plans/recharge-plans.component';



@NgModule({
  declarations: [
    CustomerDashboardComponent,
    RechargePlansComponent,

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ],
  exports: [
    RechargePlansComponent,
    
  ]
})
export class CustomerModule { }
