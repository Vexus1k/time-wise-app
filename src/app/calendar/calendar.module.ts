import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarPageComponent } from "./pages/callendary-page/calendar-page.component";
import { UiModule } from "../../assets/ui/ui.module";
import { CalendarResolver } from "./core/resolvers/CalendarResolver";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    CalendarPageComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    UiModule,
    ReactiveFormsModule
  ],
  providers: [CalendarResolver]
})
export class CalendarModule { }
