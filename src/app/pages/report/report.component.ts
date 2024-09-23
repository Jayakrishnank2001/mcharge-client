import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  reportData!: any[]
  
  constructor(private _reportService: ReportService) { }
  
  ngOnInit(): void {
    this.parkingReportData()
  }

  parkingReportData() {
    this._reportService.getParkingReport(1,10).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }
  

}
