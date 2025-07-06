import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BankAccountService } from '../../../services/bank-account/bank-account.service';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'app-view-card',
  imports: [CommonModule, ReactiveFormsModule, TimelineComponent],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css',
})
export class ViewCardComponent implements OnInit {
  cardId: string | null = null;

  singleCardData: any | null = null;
  formGroup: FormGroup | undefined;
  timelineItems: any[] = [];

  selectedCardType: string | undefined;
  constructor(
    private bankAccountService: BankAccountService,
    private toasterService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cardId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.cardId) {
      this.fetchCardData();
      this.fetchTimelinePerCard()
    }

    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      cardNumber: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      expiry: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      cvv: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      total: new FormControl('', [Validators.required]),
    });
  }

  async fetchCardData() {
    if (!this.cardId) this.toasterService.error('Could not find card', 'Error');
    else {
      await this.bankAccountService
        .getSingleBankAccount(Number.parseInt(this.cardId))
        .subscribe({
          next: (response) => {
            this.singleCardData = response;
            if (this.singleCardData) {
              this.formGroup?.patchValue(this.singleCardData[0]);
              this.selectedCardType = this.singleCardData[0].type;
            }
          },
          error: (error) => {},
          complete: () => {},
        });
    }
  }

  
  async fetchTimelinePerCard() {
    if (!this.cardId) this.toasterService.error('Could not find card', 'Error');
    else {
      await this.bankAccountService
        .getTimelinePerBankAccount(Number.parseInt(this.cardId))
        .subscribe({
          next: (response) => {
            this.timelineItems = response;   
            console.log(this.timelineItems)         
          },
          error: (error) => {},
          complete: () => {},
        });
    }
  }
  async updateCard() {
    if (this.formGroup && this.selectedCardType && this.cardId) {
      const data = {
        ...this.formGroup.getRawValue(),
        type: this.selectedCardType,
      };

      await this.bankAccountService
        .updateBankAccount(data, Number.parseInt(this.cardId))
        .subscribe({
          next: (response) => {
            this.toasterService.success('Card updated', 'Succes');
            setTimeout(() => {
              this.router.navigate(['/account/credit-cards']);
            }, 1000);
          },
          error: (error) => {
            this.toasterService.error('Could not update card', 'Error');
          },
          complete: () => {},
        });
    }
  }
}
