import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit,OnDestroy{

  @Input() loadingTime: number = 3000; // Default loading time in milliseconds
  isLoading: boolean = false;
  private loadingSubscription?: Subscription;

  ngOnInit() {
    this.isLoading = true;
    this.loadingSubscription = timer(this.loadingTime).subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
