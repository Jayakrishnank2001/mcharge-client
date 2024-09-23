import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environments } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isPasswordVisible = false;

  private SALT_KEY = environments.SALT_KEY

  constructor(private _fb: FormBuilder,
    private _authService: AuthService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initializeForm();
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  private initializeForm(): void {
    this.loginForm = this._fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.getRawValue()
      const authcode = CryptoJS.SHA1(this.SALT_KEY + formData.userName).toString();
      const device_type = '1-android'
      formData.authcode = authcode
      formData.device_type = device_type
      this._authService.userLogin(formData).subscribe({
        next: (res) => {
          if (res.status === 1) {
            this._authService.setToken('token', res.token)
            this.router.navigate(['/dashboard'])
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




}
