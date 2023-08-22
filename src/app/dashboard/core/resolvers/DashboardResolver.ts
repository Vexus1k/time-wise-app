import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, map, Observable } from "rxjs";
import { ICommunity } from "../interfaces/ICommunity";
import { ISharing } from "../interfaces/ISharing";
import { CommunityService } from "../services/CommunityService";
import { SharingService } from "../services/SharingService";


@Injectable()
export class DashboardResolver implements Resolve<{ posts: ICommunity[], sharingPosts: ISharing[] }> {
  constructor(
    private readonly _communityService: CommunityService,
    private readonly _sharingService: SharingService
  ) {}

  public resolve(): Observable<{ posts: ICommunity[], sharingPosts: ISharing[] }> {
    return forkJoin([
      this._communityService.getAllCommunityPosts(),
      this._sharingService.getAllSharedPosts()
    ]).pipe(
      map(([posts, sharingPosts]) => {
        return { posts, sharingPosts };
      })
    );
  }
}
