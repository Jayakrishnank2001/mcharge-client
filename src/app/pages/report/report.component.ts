import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ReportService } from '../../services/report.service';
import { ParkingBooking } from '../../models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [DataTableComponent, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  parkingHistory!: ParkingBooking[]
  
  constructor(private _reportService: ReportService) { }
  
  ngOnInit(): void {
    this.parkingReportData()
  }

  parkingReportData() {
    this._reportService.getParkingReport(1,10).subscribe({
      next: (res:any) => {
        this.parkingHistory = res.data.items
      }
    })
  }
  

}
