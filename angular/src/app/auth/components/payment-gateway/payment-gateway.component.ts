import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { RechargePlansComponent } from '../../../modules/customer/components/recharge-plans/recharge-plans.component';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  planAmount: string = RechargePlansComponent.amount;
  paymentForm!: FormGroup;
  selectedTab: string = 'upi'; // Default selected tab

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      cardNumber: [null, [Validators.required, Validators.pattern('[0-9]{16}')]],
      expiryMonth: [null, [Validators.required, Validators.pattern('(0[1-9]|1[0-2])')]],
      expiryYear: [null, [Validators.required, Validators.pattern('\\d{4}')]],
      cvv: [null, [Validators.required, Validators.pattern('[0-9]{3}')]]
    });
  }

  // Function to change selected tab
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  makePayment() {
    if (this.paymentForm.valid) {
      const currentDate = new Date();
      const daysToAddInt = parseInt(RechargePlansComponent.validity.toString());
      const futureDate = new Date(currentDate.getTime() + daysToAddInt * 24 * 60 * 60 * 1000);

      const record = {
        id: StorageService.getUserId(),
        name: StorageService.getUserName(),
        plan: this.planAmount,
        validity: futureDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        date: currentDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        email: StorageService.getUserEmail()
      };

      this.authService.saveRecord(record).subscribe((res) => {
        this.message.success('Your Recharge was successfully processed !', { nzDuration: 5000 });
        this.router.navigateByUrl('/customer/dashboard');
      });
    } else {
      // Form is invalid, display error messages or take appropriate action
      // You can optionally mark all controls as touched to trigger validation messages
      this.paymentForm.markAllAsTouched();
    }
  }
}
