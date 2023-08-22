import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
import { DashboardResolver } from "./core/resolvers/DashboardResolver";

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    resolve: {
      posts: DashboardResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
