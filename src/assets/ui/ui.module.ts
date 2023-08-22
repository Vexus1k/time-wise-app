import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";


@NgModule({
    declarations: [
      LoaderComponent,
      PageNotFoundComponent
    ],
    exports: [
      LoaderComponent,
      PageNotFoundComponent,
    ],
    imports: [
      CommonModule
    ]
})
export class UiModule { }
