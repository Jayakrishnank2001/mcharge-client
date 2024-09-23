import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  
  constructor(private router: Router) { }

  isActive(link: string): boolean {
    return this.router.url.includes(link.toLowerCase());
  }

}
