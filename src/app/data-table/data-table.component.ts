import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  data: any[] = [];
  searchText = '';
  sortColumn = '';
  sortDirection = 1;
  currentPage = 0;
  pageSize = 5;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe(data => {
      this.data = data;
    });
  }

  getFilteredData() {
    let filteredData = this.data.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.age.toString().includes(this.searchText) ||
      item.email.toLowerCase().includes(this.searchText.toLowerCase())
    );

    if (this.sortColumn) {
      filteredData = filteredData.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
        return (aValue > bValue ? 1 : -1) * this.sortDirection;
      });
    }

    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return filteredData.slice(start, end);
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = 1;
    }
  }

  get totalPages() {
    return Math.ceil(this.data.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.age.toString().includes(this.searchText) ||
      item.email.toLowerCase().includes(this.searchText.toLowerCase())
    ).length / this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
    }
  }
}
