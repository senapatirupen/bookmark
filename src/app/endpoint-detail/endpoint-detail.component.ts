import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-endpoint-detail',
  templateUrl: './endpoint-detail.component.html',
  styleUrls: ['./endpoint-detail.component.scss']
})
export class EndpointDetailComponent implements OnInit {
  endpointId: number;
  endpoint: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.endpointId = +this.route.snapshot.paramMap.get('endpointId')!;
  }

  ngOnInit(): void {
    this.productService.getEndpointDetails(this.endpointId).subscribe(data => {
      this.endpoint = data;
    });
  }
}
