import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: any[] = [];
  newTag: string = '';

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.fetchTags();
  }

  fetchTags(): void {
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  addTag(): void {
    if (this.newTag.trim()) {
      const newTag = { tags: this.newTag.split(',').map(tag => tag.trim()) };
      this.tagService.addTag(newTag).subscribe(() => {
        this.fetchTags();
        this.newTag = '';
      });
    }
  }

  updateTag(tag: any): void {
    this.tagService.updateTag(tag).subscribe(() => this.fetchTags());
  }

  deleteTag(id: number): void {
    this.tagService.deleteTag(id).subscribe(() => this.fetchTags());
  }
}
