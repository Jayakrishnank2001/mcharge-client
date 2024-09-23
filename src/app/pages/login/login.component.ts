import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private _fb: FormBuilder,
    private _authService: AuthService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.initializeForm();
    if (localStorage.getItem('Token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  private initializeForm():void {
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
      const formData=this.loginForm.getRawValue()
      this._authService.userLogin(formData).subscribe({
        next: (res) => {
          if (res.status === 1) {
            this._authService.setToken('token',res.token)
            this.router.navigate(['/dashboard'])
          }
        }
      })
     }
  }




}
