import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() Active: number = 0;
  @Input() Inactive: number = 0;
  @Input() total: string = '';
  @Input() iconBackgroundColor: string = '';
}
