import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ICommunity } from "../../core/interfaces/ICommunity";
import { ISharing } from "../../core/interfaces/ISharing";
import { AbstractFormManager } from "../../../../assets/abstarcts/AbstarctFormManager";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs";
import { NotificationService } from "../../../core/services/NotificationService";
import { CommunityService } from "../../core/services/CommunityService";
import { SharingService } from "../../core/services/SharingService";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent extends AbstractFormManager {
  public posts: ICommunity[];
  public sharingPosts: ISharing[];
  public commentForm: FormGroup;
  public postWithCurrentlyAddingComment: ICommunity;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _notificationService: NotificationService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _communityService: CommunityService,
    private readonly _sharingService: SharingService
  ) {
    super({
      content: { validate: true, validators: [Validators.required] }
    });

    this.commentForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    });

    const { posts, sharingPosts } = this._route.snapshot.data['posts'];
    this.posts = posts;
    this.sharingPosts = sharingPosts;
  }

  public addPost(): void {
    this.validateForm(this.form);

    if (this.form.valid) {
      this._communityService.createPost(this.form.value).pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe((newEvent) => {
        this.posts.push(newEvent);
        this._notificationService.pushSuccess("Post dodano pomyślnie.");
      }, error => {
        this._notificationService.pushSuccess("Wystąpił błąd podczas dodawania posta.");
      });
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }

  public addComment(): void {
    this.validateForm(this.commentForm);

    if (this.commentForm.valid) {
      this._communityService.addComment(
        { ...this.commentForm.value, postId: this.postWithCurrentlyAddingComment.id }
      ).pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe((newComment) => {
        const postIndex = this.posts.findIndex(post => post.id === this.postWithCurrentlyAddingComment.id);
        if (postIndex !== -1) {
          this.posts[postIndex].comments.push(newComment);
        }

        this.sharingPosts.forEach(sharingPost => {
          if (sharingPost.sharedPost.id === this.postWithCurrentlyAddingComment.id) {
            sharingPost.sharedPost.comments.push(newComment);
          }
        });

        this._notificationService.pushSuccess("Komentarz dodano pomyślnie.");
      }, error => {
        this._notificationService.pushSuccess("Wystąpił błąd podczas dodawania komentarza.");
      });
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }

  public likePost(postId: number): void {
    this._communityService.likePost(postId).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe((likesCount) => {
      const postIndex = this.posts.findIndex(post => post.id === postId);

      if (postIndex !== -1) {
        this.posts[postIndex].likesCount = likesCount;
        this.posts[postIndex].userLiked = !this.posts[postIndex].userLiked;
      }

      this.sharingPosts.forEach(sharingPost => {
        if (sharingPost.sharedPost.id === postId) {
          sharingPost.sharedPost.likesCount = likesCount;
        }
      });

      this._notificationService.pushSuccess("Akcja wykonana pomyślnie.");
    }, error => {
      this._notificationService.pushError("Wystąpił błąd. Spróbuj później.");
    });
  }

  public sharePost(postId: number) {
    this._sharingService.sharePost(postId).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe((res) => {
      this.sharingPosts.push(res);
      this._notificationService.pushSuccess("Post został pomyślnie udostępniony.");
    }, error => {
      this._notificationService.pushError('Wystąpił błąd podczas próby udostępniania posta.')
    });
  }
}
