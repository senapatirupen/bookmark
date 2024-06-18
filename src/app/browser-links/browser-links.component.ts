import { Component, OnInit } from '@angular/core';
import { BrowserLinkService } from '../services/browser-link.service';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-browser-links',
  templateUrl: './browser-links.component.html',
  styleUrls: ['./browser-links.component.scss']
})
export class BrowserLinksComponent implements OnInit {
  browserLinks: any[] = [];
  tags: any[] = [];
  newLink: string = '';
  newTags: string = '';

  constructor(private browserLinkService: BrowserLinkService, private tagService: TagService) {}

  ngOnInit(): void {
    this.fetchBrowserLinks();
    this.fetchTags();
  }

  fetchBrowserLinks(): void {
    this.browserLinkService.getBrowserLinks().subscribe(data => {
      this.browserLinks = data;
    });
  }

  fetchTags(): void {
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  addBrowserLink(): void {
    this.browserLinkService.getBrowserLinkByUrl(this.newLink).subscribe(existingLink => {
      const tagsArray = this.newTags.split(' ').map(tag => tag.trim()).filter(tag => tag.length > 0);
      this.createTags(tagsArray).then(tagIds => {
        if (existingLink) {
          // If the link exists, update the tags
          existingLink.tagIds = Array.from(new Set([...existingLink.tagIds, ...tagIds]));
          this.browserLinkService.updateBrowserLink(existingLink).subscribe(() => {
            this.fetchBrowserLinks();
            this.newLink = '';
            this.newTags = '';
          });
        } else {
          // If the link does not exist, create a new link
          const newLink = { link: this.newLink, tagIds: tagIds };
          this.browserLinkService.addBrowserLink(newLink).subscribe(() => {
            this.fetchBrowserLinks();
            this.newLink = '';
            this.newTags = '';
          });
        }
      });
    });
  }

  async createTags(tags: string[]): Promise<number[]> {
    const tagIds: number[] = [];
    for (const tag of tags) {
      const existingTag = this.tags.find(t => t.tags.includes(tag));
      if (existingTag) {
        tagIds.push(existingTag.id);
      } else {
        const newTag = { tags: [tag] };
        const createdTag = await this.tagService.addTag(newTag).toPromise();
        this.tags.push(createdTag);
        tagIds.push(createdTag.id);
      }
    }
    return tagIds;
  }

  updateBrowserLink(browserLink: any): void {
    this.browserLinkService.updateBrowserLink(browserLink).subscribe(() => this.fetchBrowserLinks());
  }

  deleteBrowserLink(id: number): void {
    this.browserLinkService.deleteBrowserLink(id).subscribe(() => this.fetchBrowserLinks());
  }
}
