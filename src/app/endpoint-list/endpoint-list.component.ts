import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss']
})
export class EndpointListComponent implements OnInit {
  apiId: number;
  endpoints: any[] = [];
  filteredEndpoints: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
    this.apiId = +this.route.snapshot.paramMap.get('apiId')!;
  }

  ngOnInit(): void {
    this.productService.getEndpoints(this.apiId).subscribe(data => {
      this.endpoints = data;
      this.filteredEndpoints = data;
    });
  }

  searchEndpoints(): void {
    this.filteredEndpoints = this.endpoints.filter(endpoint => 
      endpoint.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getPaginatedEndpoints(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEndpoints.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  totalPages(): number {
    return Math.ceil(this.filteredEndpoints.length / this.itemsPerPage);
  }

  selectEndpoint(endpointId: number): void {
    this.router.navigate([`/endpoints/${endpointId}`]);
  }
}
