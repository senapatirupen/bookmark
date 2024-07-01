import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})
export class ApiListComponent implements OnInit {
  productId: number;
  apis: any[] = [];
  filteredApis: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
  }

  ngOnInit(): void {
    this.productService.getApis(this.productId).subscribe(data => {
      this.apis = data;
      this.filteredApis = data;
    });
  }

  searchApis(): void {
    this.filteredApis = this.apis.filter(api => 
      api.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getPaginatedApis(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredApis.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  totalPages(): number {
    return Math.ceil(this.filteredApis.length / this.itemsPerPage);
  }

  selectApi(apiId: number): void {
    this.router.navigate([`/apis/${apiId}/endpoints`]);
  }
}
