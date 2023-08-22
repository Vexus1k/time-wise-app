import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from "./layouts/base-layout/base-layout.component";

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: 'user-info',
        loadChildren: () => import('../user-info/user-info.module').then(m => m.UserInfoModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'note',
        loadChildren: () => import('../note/note.module').then(m => m.NoteModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'suggestion',
        loadChildren: () => import('../suggestion/suggestion.module').then(m => m.SuggestionModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
