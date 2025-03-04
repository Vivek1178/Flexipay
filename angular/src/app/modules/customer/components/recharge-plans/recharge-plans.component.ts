import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge-plans',
  templateUrl: './recharge-plans.component.html',
  styleUrl: './recharge-plans.component.scss'
})

export class RechargePlansComponent {
  static amount: any;
  static validity:String;

  plansList= [

   {
      regularPlans:[ 
        {
          id: 'popularPlans',
          category:'Popular Plans',
          plans:[
            {
              planId :1,
              price: 259,
              data: '1.58GB/day',
              validity: '30 days',
              calls: 'Unlimited'
            },
            {
              planId :2,
              price: 399,
              data: '3GB/day + 6GB',
              validity: '28 days',
              calls: 'Unlimited'
            },
            {
              planId :3,
              price: 666,
              data: '1.5GB/day',
              validity: '84 days',
              calls: 'Unlimited'
            },
            {
              planId :3,
              price: 1198,
              data: '2GB/day + 18GB',
              validity: '84 days',
              calls: 'Unlimited'
            },
          ]
        },
        {
          id: 'dataAddOn',
          category:'Data Add On',
          plans:[
            {
              planId :1,
              price: 49,
              data: 'Unlimited',
              validity: '1 day',
              calls: 'N/A'
            },
            {
              planId :2,
              price: 148,
              data: '10GB',
              validity: '28 days',
              calls: 'N/A'
            },
            {
              planId :3,
              price: 331,
              data: '40GB',
              validity: '30 days',
              calls: 'N/A'
            },
            {
              planId :3,
              price: 667,
              data: '150GB',
              validity: '90 days',
              calls: 'N/A'
            },
          ]
        },
        {
          id: 'smartPhone',
          category:'Smart Phone',
          plans:[
            {
              planId :1,
              price: 299,
              data: '2GB / day',
              validity: '28 days',
              calls: 'Unlimited'
            },
            {
              planId :2,
              price: 749,
              data: '2GB / day',
              validity: '90 days',
              calls: 'Unlimited'
            },
            {
              planId :3,
              price: 1099,
              data: '2GB / day + 18GB',
              validity: '84 days',
              calls: 'Unlimited'
            },
            {
              planId :3,
              price: 2999,
              data: '2.5GB / day',
              validity: '365 days',
              calls: 'Unlimited'
            },
          ]
        },
      ]
    },

    {
      id:'topUp',
      category:'Top Up',
      plans:[
        {
          planId :1,
          price: 20,
          talktime: '14.95',
          validity: 'N/A',
          
        },
        {
          planId :2,
          price: 50,
          talktime: '39.37',
          validity: 'N/A',
        },
        {
          planId :3,
          price: 100,
          talktime: '81.75',
          validity: 'N/A',
        },
        {
          planId :3,
          price: 1000,
          talktime: '844.46',
          validity: 'N/A',
        },
      ]
    }

  ]
  constructor(private router: Router){}
  
  rechargeNow(planCost:number,validity:String){
    RechargePlansComponent.amount = planCost;
    RechargePlansComponent.validity = validity;
    alert("\nProcced to payment ?\nPlan Amount: ₹ "+RechargePlansComponent.amount + "\nValidity (Days): "+RechargePlansComponent.validity);
    this.router.navigateByUrl('/payment-gateway');
  }
}
