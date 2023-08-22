import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarPageComponent } from "./pages/callendary-page/calendar-page.component";
import { CalendarResolver } from "./core/resolvers/CalendarResolver";

const routes: Routes = [
  {
    path: '',
    component: CalendarPageComponent,
    resolve: {
      calendarData: CalendarResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
