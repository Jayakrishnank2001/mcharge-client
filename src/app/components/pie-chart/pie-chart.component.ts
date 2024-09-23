import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { MaterialModule } from '../../material/material.module';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements AfterViewInit{

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() chartData!: ChartData<'pie'>;
  @Input() chartOptions!: ChartConfiguration['options'];
  @Input() chartTitle: string = '';

  private pieChart!: Chart<'pie'>;

  constructor() {}

  ngAfterViewInit():void {
      this.initializeChart();
  }
  initializeChart() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: this.chartData,
      options: this.chartOptions,
    } as ChartConfiguration<'pie'>);
  }
  

  
}