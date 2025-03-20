import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, RouterModule,  ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  loginForm!: FormGroup;



  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    
    this.loginForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
      
    });

  }

  onSubmit() {
    // if(!this.loginForm.valid){
    //      console.log("this.log", this.loginForm);
          
    //   return
    // }
    console.log(this.loginForm.value);
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.authService.saveUserToLocalStorag({email: response.email, token: response.token, roles: response.roles})
        this.router.navigate([''])
      },
      error: (error) => {
        //manage error if happens
        this.showError()
      }, 
      complete: () => {

      }
    })
  }
  showError() {
    
    this.toastr.error('Wrong credentials', 'Error');
  }
  
 
}
