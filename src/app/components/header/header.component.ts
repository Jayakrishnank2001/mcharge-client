import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  
  constructor(private _router: Router) { }

  isActive(link: string): boolean {
    return this._router.url.includes(link.toLowerCase());
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

}
