import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankAccountService } from '../../../services/bank-account/bank-account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.css'
})
export class AddCardComponent implements OnInit {

  formGroup: FormGroup | undefined;


  selectedCardType: string | undefined;
  constructor(
    private bankAccountService: BankAccountService,
    private toasterService: ToastrService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      cardNumber: new FormControl('',[Validators.required]),
      expiry: new FormControl('',[Validators.required]),
      cvv: new FormControl('',[Validators.required]),
      total: new FormControl('', [Validators.required])

    })
  }

  async addCard(){

    if(this.formGroup  && this.selectedCardType){
      const data = {...this.formGroup.getRawValue(), type: this.selectedCardType};

      await this.bankAccountService.createBankAccount(data).subscribe({
        next: (response) => {
          this.toasterService.success("Card created", "Succes");
          setTimeout(() => {
            this.router.navigate(['/account/credit-cards'])

          },1000)
        },
        error: (error) => {
          this.toasterService.error("Could not create card", "Error")

        },
        complete: () => {

        }
      })
      
    }
  }
}
