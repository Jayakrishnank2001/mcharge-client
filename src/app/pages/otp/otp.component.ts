import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {

  isOTPVisible = false;
  otpForm!: FormGroup

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router) { }

  ngOnInit(): void {
    this.otpForm = this._fb.group({
      otp: ['', [Validators.required]]
    })
  }


  toggleOTPVisibility() {
    this.isOTPVisible = !this.isOTPVisible;
  }

  onSubmit() {
    if (this.otpForm.valid) {
      const reset_key = localStorage.getItem('resetKey')
      const formData = this.otpForm.getRawValue()
      formData.resetKey = reset_key
      formData.reason = 1
      this._authService.verifyOTP(formData).subscribe({
        next: (res: any) => {
          if (res.status === 1) {
            this._router.navigate(['/login'])
            localStorage.removeItem('resetKey')
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

  resendOTP() {
    const resetKey = localStorage.getItem('resetKey')
    const reason = 1
    const data = { resetKey: resetKey, reason: reason }
    this._authService.resendOTP(data).subscribe({
      next: (res: any) => {
        this._snackBar.open(res.msg, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
    })
  }

}
