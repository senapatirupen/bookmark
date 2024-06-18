import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrowserLinkService {
  private apiUrl = 'http://localhost:3000/browserLinks';

  constructor(private http: HttpClient) {}

  getBrowserLinks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addBrowserLink(browserLink: any): Observable<any> {
    return this.http.post(this.apiUrl, browserLink);
  }

  updateBrowserLink(browserLink: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${browserLink.id}`, browserLink);
  }

  deleteBrowserLink(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getBrowserLinkByUrl(url: string): Observable<any> {
    return this.getBrowserLinks().pipe(
      map(links => links.find((link: any) => link.link === url))
    );
  }

  searchBrowserLinksByTags(tags: string[], allTags: any[]): Observable<any[]> {
    const tagIds = tags
      .map(tag => allTags.find(t => t.tags.includes(tag))?.id)
      .filter(id => id !== undefined);
    return this.getBrowserLinks().pipe(
      map(links => links.filter((link: any) => 
        tagIds.every(tagId => link.tagIds.includes(tagId))
      ))
    );
  }
}
