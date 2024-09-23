import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {

  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  
  searchTerm: string = '';
  showSearchFields: boolean = false;
  selectedCustomer: string = '';
  selectedPaymentType: string = '';
  startDate: string = '';
  endDate: string = '';
  totalItems = 100;
  pageSize = 10;
  pageIndex = 0;

  customers: string[] = ['Customer 1', 'Customer 2', 'Customer 3'];
  paymentTypes: string[] = ['Credit Card', 'PayPal', 'Bank Transfer'];

  filteredData() {
    if (!this.searchTerm) return this.data;
    return this.data.filter(item => 
      Object.values(item).some(val => {
        return (val as string).toString().toLowerCase().includes(this.searchTerm.toLowerCase());
      })
    );
  }

  toggleSearch() {
    this.showSearchFields = !this.showSearchFields;
  }

  applyFilters() {

  }

  resetFilters() {
    this.selectedCustomer = '';
    this.selectedPaymentType = '';
    this.startDate = '';
    this.endDate = '';
    this.searchTerm = '';
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.applyFilters(); 
  }


}
