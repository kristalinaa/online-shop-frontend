import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BagService } from '../../../services/bag/bag.service';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BankAccountService } from '../../../services/bank-account/bank-account.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cards: any[] = [];

  selectedBankAccount: any | null = null
  bagRecords: any[] = []
  cities: any[] = [];
  countryCity: any[] = [
    {
      country: "Albania",
      city: ['Tirana', 'Elbasan','Fier','Durres']
    },
    {
      country: "Kosovo",
      city: ['Prizren','Prishtina','Gjakova']
    }
  ]

  selectedPaymentMethod: string = 'cart';
  selectedDeliveryMethod: string = 'DHL';
  formGroup: FormGroup | undefined;
  constructor(
    private cdf: ChangeDetectorRef,
    private bagService: BagService,
    private checkoutService: CheckoutService,
    private toasterService: ToastrService,
    private router:Router,
    private bankAccountService: BankAccountService
  ){

  }

  ngOnInit(): void {
    this.fetchData()
    this.initForm()

    this.fetchBankAccount()

    this.formGroup?.get('country')?.valueChanges.subscribe(it => {
      this.getCityPerCountry()
      this.cdf.detectChanges()
    })
  }

  initForm(){
    this.formGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),

      city: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required])


    })
  }

  async fetchBankAccount(){
    await this.bankAccountService.getBankAccounts().subscribe({
      next: (response) => {
        this.cards = response
      },
      error: (error) => {

      },
      complete: () => {

      }
    })
  }


  async doPayment() {

    const data = {metadata: {
      ...this.formGroup?.getRawValue(),
      paymentMethod: this.selectedPaymentMethod, deliveryMethod: this.selectedDeliveryMethod,
      cardId: this.selectedBankAccount,
    total: this.getTotal()
    },
  items: this.bagRecords}



    await this.checkoutService.createCheckout(data).subscribe({
      next: (response) => {
        this.toasterService.success("Checkout is complete","Success")

        setTimeout( () => {
          this.router.navigate([])
        },1000)
      },
      error: (error) => {
        this.toasterService.error("Checkout is not complete","Error")

      },
      complete: () => {

      }
    })
  }
  async fetchData(){
    const sub = await this.bagService.productOnBagPerUser().subscribe({
      next: (response) => {
        this.bagRecords = response;
      },
      error: (error) => {
        //handle error
      },
      complete: () => {
        sub.unsubscribe()
      }
    })
  }


  getSubTotal() {
    return this.bagRecords.reduce((total, bag) => {
      const price = bag.product?.price ?? 0;
      const quantity = bag.quantity ?? 0;
      return total + price * quantity;
    }, 0);
  }

  getTotal() {
    return this.getSubTotal() + 99 + 199
  }

  selectCard(card: any){ 
    this.selectedBankAccount = card.id
  }

  getCityPerCountry(){
    const country = this.formGroup?.getRawValue().country;
    if(!country) this.cities = []
    this.cities =  this.countryCity.find(it => it.country == country).city
    return this.cities;
  }
}
