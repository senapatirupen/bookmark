import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) { }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?postId=${postId}`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }

  updateComment(id: number, comment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
