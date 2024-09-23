import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import Chart, { ChartConfiguration, ChartData } from 'chart.js/auto';
import { Inject, PLATFORM_ID } from '@angular/core';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, DashboardCardComponent, CommonModule, PieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;

  cards = [
    { icon: '../../../assets/images/card1-img.png', title: 'Users', activeCount: 100, inactiveCount: 20, total: '120', iconBackgroundColor: '#328cd1' },
    { icon: '../../../assets/images/card2-img.png', title: 'Orders', activeCount: 50, inactiveCount: 10, total: '60', iconBackgroundColor: '#d18c32' },
    { icon: '../../../assets/images/card3-img.png', title: 'Products', activeCount: 200, inactiveCount: 30, total: '230', iconBackgroundColor: '#8c32d1' },
    { icon: '../../../assets/images/card4-img.png', title: 'Deliveries', activeCount: 30, inactiveCount: 5, total: '35', iconBackgroundColor: '#2ab95a' },
    { icon: '../../../assets/images/card5-img.png', title: 'Revenue', activeCount: 1000, inactiveCount: 0, total: '1000', iconBackgroundColor: '#d1d132' },
    { icon: '../../../assets/images/card6-img.png', title: 'Users', activeCount: 100, inactiveCount: 20, total: '120', iconBackgroundColor: '#d13250' },
  ];

  constructor(private _dashboardService: DashboardService) { }

  ngAfterViewInit(): void {
      this.createLineChart();
      this.createPieChart();
  }

  createLineChart() {
    const ctx = this.lineChartRef.nativeElement.getContext('2d');
    new Chart(ctx!, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Monthly Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },

    });
  }

  createPieChart() {
    const ctx = this.barChartRef.nativeElement.getContext('2d');
    new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Electronics', 'Clothing', 'Food', 'Books'],
        datasets: [{
          data: [30, 25, 20, 25],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ]
        }]
      },

    });
  }

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      }
    }
  };

  stationChartData: ChartData<'pie'> = {
    labels: ['active stations', 'inactive stations', 'maintenance stations'],
    datasets: [{
      data: [58.3, 16.7, 25.0],
      backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
    }]
  };

  unitConsumedChartData: ChartData<'pie'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    datasets: [{
      data: [0, 0, 0, 0, 0, 2, 1, 0],
      backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#007bff', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997', '#17a2b8'],
    }]
  };

  chargerChartData: ChartData<'pie'> = {
    labels: ['active chargers', 'inactive chargers', 'maintenance chargers'],
    datasets: [{
      data: [79.2, 8.3, 12.5],
      backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
    }]
  };

}
