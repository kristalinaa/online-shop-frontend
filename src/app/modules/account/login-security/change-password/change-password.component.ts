import { CommonModule, Location, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';

import { Router } from '@angular/router';

import { finalize } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Condition } from '../../../../interface/interface';
import { StrongPasswordRegx } from '../../../../interface/password-regexp';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  showError: boolean = false;
  isSuccess: boolean = false;
  changePasswordForm: FormGroup = new FormGroup({});
  showAlert: boolean = false;
  isPasswordMatching: boolean = false;
  isButtonClicked: boolean = false;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  waitingForSave: boolean = false;

  conditions: Condition[] = [
    {
      id: 1,
      regex: '^(?=.*[A-Z])',
      description: 'At least one uppercase letter.',
    },
    {
      id: 2,
      regex: '(?=.*[a-z])',
      description: 'At least one lowercase letter.',
    },
    { id: 3, regex: '(.*[0-9].*)', description: 'At least one digit.' },
    {
      id: 4,
      regex: '(?=.*[!@#$%^&*])',
      description: 'At least one special character.',
    },
    { id: 5, regex: '.{8,}', description: 'At least 8 characters long.' },
  ];

  conditionsMetOrder: Condition[] = [];
  constructor(
    private _authService: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // Create the form

    this.changePasswordForm = this._formBuilder.group(
      {
        oldPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(StrongPasswordRegx),
        ]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(StrongPasswordRegx),
        ]),
        confirmNewPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  sendChangePasswordLink(): void {
    this.showError = false;
    this.isButtonClicked = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.changePasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    // change password
    const createdObject = this.changePasswordForm.getRawValue();

    this._authService
      .changePassword(createdObject)
      .pipe(
        finalize(() => {
          this.isButtonClicked = false;
        })
      )
      .subscribe(
        (response): any => {
          if (response.success == true) {
            this.isSuccess = true;
            this.showError = false;
            this.toasterService.success('Password updated', 'Success');
            setTimeout(() => {}, 700);
          } else {
            this.isSuccess = false;

            this.showError = true;
            this.toasterService.error('Password not updated', 'Error');

            setTimeout(() => {
              this.changePasswordForm.enable();

              this.isButtonClicked = false;
            }, 400);
          }
          // // Set the alert
          // this.alert = {
          //     type   : 'success',
          //     message: 'Password reset sent! You\'ll receive an email if you are registered on our system.'
          // };
        },
        (error) => {
          this.isSuccess = false;
          this.toasterService.error('Password not updated', 'Error');

          this.showError = true;
          this.changePasswordForm.enable();

          // // Set the alert
          // this.alert = {
          //     type   : 'error',
          //     message: 'Email does not found! Are you sure you are already a member?'
          // };
        }
      );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmNewPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get passwordFormField() {
    return this.changePasswordForm.get('newPassword');
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  updateConditionsMetOrder() {
    this.conditionsMetOrder = this.conditions.filter((condition) =>
      this.checkCondition(condition.regex)
    );
  }

  checkCondition(regex: string): boolean {
    return new RegExp(regex).test(this.passwordFormField?.value || '');
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  navigateBack() {
    this._location.back();
  }
}
