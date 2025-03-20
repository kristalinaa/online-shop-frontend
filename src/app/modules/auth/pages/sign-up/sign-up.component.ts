import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  imports: [
    RouterModule,  ReactiveFormsModule, NgIf, NgClass
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [AuthService]
})
export class SignUpComponent {
  signupForm!: FormGroup;
   
  selectedType: string = 'person'
  constructor(private formBuilder: FormBuilder, private authService : AuthService,private router: Router, private toastr: ToastrService) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
      
    });
  }
  async onSubmit() {
    console.log(this.signupForm.value);
    await this.authService.registerUser({...this.signupForm.value, type: this.selectedType}).subscribe(
      {
        next: (response: any) => {
          if(response){
            this.authService.saveUserToLocalStorag({email: response.email, token: response.token, roles: response.roles});
            this.router.navigate([''])
          }
        },
        error: (error) => {
          //manage error if happens

        },
        complete: () => {

        }
      }
    )
  }
  selectType(type: string){
    this.selectedType = type;
  }

  showError() {
    
    this.toastr.error('This email already exists', 'Error');
  }
}
