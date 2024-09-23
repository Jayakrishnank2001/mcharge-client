import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  isPasswordVisible = false;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      userName: [''],
      email: ['', [Validators.required]],
      phone: [''],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.getRawValue()
      // formData.append('name', ''); // Assuming you're sending an empty string
      // formData.append('userName', this.signupForm.get('userName')?.value);
      // formData.append('email', this.signupForm.get('email')?.value);
      // formData.append('phone', ''); // Assuming you're sending an empty string
      // formData.append('address', ''); // Assuming you're sending an empty string
      // formData.append('location', ''); // Assuming you're sending an empty string
      // formData.append('pincode', ''); // Assuming you're sending an empty string
      // formData.append('profile_image', ''); // Assuming no file is chosen
      // formData.append('password', this.signupForm.get('password')?.value);
      this._authService.userSignup(formData).subscribe({
        next: (res) => {
          console.log(res)
        }
      })
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
