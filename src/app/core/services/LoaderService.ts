import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _isLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this._isLoadingSubject$.asObservable();

  constructor(
    private readonly _router: Router
  ) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._isLoadingSubject$.next(true);
      } else if (event instanceof NavigationEnd) {
        this._isLoadingSubject$.next(false);
      }
    });
  }
}
