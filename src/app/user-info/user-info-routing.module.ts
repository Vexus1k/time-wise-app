import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentityResolver } from "../core/resolvers/IdentityResolver";
import { AccountManagementPageComponent } from "./pages/account-management-page/account-management-page.component";

const routes: Routes = [
  {
    path: 'account-management',
    component: AccountManagementPageComponent,
    resolve: {
      authResponse: IdentityResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule { }
