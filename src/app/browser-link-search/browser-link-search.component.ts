import { Component, OnInit } from '@angular/core';
import { BrowserLinkService } from '../services/browser-link.service';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-browser-link-search',
  templateUrl: './browser-link-search.component.html',
  styleUrls: ['./browser-link-search.component.scss']
})
export class BrowserLinkSearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  tags: any[] = [];

  constructor(private browserLinkService: BrowserLinkService, private tagService: TagService) {}

  ngOnInit(): void {
    this.fetchTags();
  }

  fetchTags(): void {
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  searchLinks(): void {
    const tagsArray = this.searchQuery.split(' ').map(tag => tag.trim()).filter(tag => tag.length > 0);
    if (tagsArray.length > 0) {
      this.browserLinkService.searchBrowserLinksByTags(tagsArray, this.tags).subscribe(results => {
        this.searchResults = results;
      });
    }
  }
}
