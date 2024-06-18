import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3000/tags';

  constructor(private http: HttpClient) {}

  getTags(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addTag(tag: any): Observable<any> {
    return this.http.post(this.apiUrl, tag);
  }

  updateTag(tag: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tag.id}`, tag);
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
