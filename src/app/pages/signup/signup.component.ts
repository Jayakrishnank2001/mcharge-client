import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { validateByTrimming } from '../../helpers/validations';
import { emailValidators, mobileValidators } from '../../shared/validators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      userName: ['',[Validators.required]],
      email: ['', [validateByTrimming(emailValidators)]],
      phone: ['',[validateByTrimming(mobileValidators)]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.getRawValue()
      this._authService.userSignup(formData).subscribe({
        next: (res) => {
          if (res.status === 1) {
            this._router.navigate(['/otp'])
            localStorage.setItem('resetKey',res.reset_key)
          } else {
            this._snackBar.open(res.msg, 'Close', {
              duration: 5000,
              verticalPosition: 'top',
            });
          }
        }
      })
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
