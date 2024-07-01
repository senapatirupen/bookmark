import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any;
  comments: any[] = [];
  paginatedComments: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  showAddCommentForm: boolean = false;
  newComment: any = {};
  editingComment: any = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const postId = +this.route.snapshot.paramMap.get('id')!;
    this.postService.getPost(postId).subscribe(post => {
      this.post = post;
    });

    this.commentService.getComments(postId).subscribe(comments => {
      this.comments = comments;
      this.totalPages = Math.ceil(this.comments.length / this.pageSize);
      this.updatePaginatedComments();
    });
  }

  updatePaginatedComments(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedComments = this.comments.slice(startIndex, endIndex);
  }

  searchComments(): void {
    const filteredComments = this.comments.filter(comment => comment.text.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.totalPages = Math.ceil(filteredComments.length / this.pageSize);
    this.currentPage = 1;
    this.paginatedComments = filteredComments.slice(0, this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedComments();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedComments();
    }
  }

  onSubmitComment(): void {
    if (this.editingComment) {
      this.commentService.updateComment(this.editingComment.id, this.newComment).subscribe(() => {
        const index = this.comments.findIndex(c => c.id === this.editingComment.id);
        if (index !== -1) {
          this.comments[index] = this.newComment;
          this.editingComment = null;
          this.newComment = {};
          this.updatePaginatedComments();
        }
      });
    } else {
      const newComment = { postId: this.post.id, text: this.newComment.text };
      this.commentService.addComment(newComment).subscribe((comment: any) => {
        this.comments.push(comment);
        this.totalPages = Math.ceil(this.comments.length / this.pageSize);
        this.updatePaginatedComments();
        this.newComment = {};
      });
    }
    this.showAddCommentForm = false; // Hide the form after submission
  }

  editComment(comment: any): void {
    this.editingComment = comment;
    this.newComment = { ...comment };
    this.showAddCommentForm = true; // Show the form for editing
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe(() => {
      this.comments = this.comments.filter(comment => comment.id !== id);
      this.updatePaginatedComments();
    });
  }
}
