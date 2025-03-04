import { Component } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  constructor(private router: Router) { }

  validatePhone(){
  
    const phoneNumberInput = document.getElementById('phoneNumber') as HTMLInputElement;
    const phoneNumber = phoneNumberInput.value;
    const localStoragePhoneNo = StorageService.getUserPhone();

    if(phoneNumber==localStoragePhoneNo){
      console.log("Verified successfully");
      this.router.navigateByUrl("/recharge-plans");
    }

    else{
      alert("No such record found !");
    }
    
  }
  
}
