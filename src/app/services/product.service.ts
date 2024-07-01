import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getApis(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${productId}/apis`);
  }

  getEndpoints(apiId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/apis/${apiId}/endpoints`);
  }

  getEndpointDetails(endpointId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/endpoints/${endpointId}`);
  }
}
