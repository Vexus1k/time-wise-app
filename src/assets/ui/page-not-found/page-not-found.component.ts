import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {

  constructor(
    private readonly _location: Location
  ) { }

  public goBack(): void {
    this._location.back();
  }
}
