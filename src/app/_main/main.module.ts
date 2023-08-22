import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from "./layouts/base-layout/base-layout.component";
import { MainRoutingModule } from "./main-routing.module";
import { FormsModule } from "@angular/forms";
import { UiModule } from "../../assets/ui/ui.module";


@NgModule({
  declarations: [
    BaseLayoutComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    UiModule
  ]
})
export class MainModule { }
