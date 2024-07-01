import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[]=[];
  paginatedPosts: any[]=[];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number=0;
  showAddPostForm: boolean = false;
  newPost: any = {};
  editingPost: any = null;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts: any[]) => {
      this.posts = posts;
      this.totalPages = Math.ceil(this.posts.length / this.pageSize);
      this.updatePaginatedPosts();
    });
  }

  updatePaginatedPosts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
  }

  searchPosts(): void {
    const filteredPosts = this.posts.filter(post => post.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.totalPages = Math.ceil(filteredPosts.length / this.pageSize);
    this.currentPage = 1;
    this.paginatedPosts = filteredPosts.slice(0, this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPosts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPosts();
    }
  }

  onSubmitPost(): void {
    if (this.editingPost) {
      this.postService.updatePost(this.editingPost.id, this.newPost).subscribe(() => {
        const index = this.posts.findIndex(p => p.id === this.editingPost.id);
        if (index !== -1) {
          this.posts[index] = this.newPost;
          this.editingPost = null;
          this.newPost = {};
          this.updatePaginatedPosts();
        }
      });
    } else {
      this.postService.addPost(this.newPost).subscribe((post: any) => {
        this.posts.push(post);
        this.totalPages = Math.ceil(this.posts.length / this.pageSize);
        this.updatePaginatedPosts();
        this.newPost = {};
      });
    }
    this.showAddPostForm = false; // Hide the form after submission
  }

  editPost(post: any): void {
    this.editingPost = post;
    this.newPost = { ...post };
    this.showAddPostForm = true; // Show the form for editing
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.totalPages = Math.ceil(this.posts.length / this.pageSize);
      this.updatePaginatedPosts();
    });
  }
}
