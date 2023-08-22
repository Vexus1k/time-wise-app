import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoRoutingModule } from "./user-info-routing.module";
import { CoreModule } from "../core/core.module";
import { IdentityResolver } from "../core/resolvers/IdentityResolver";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountManagementPageComponent } from './pages/account-management-page/account-management-page.component';



@NgModule({
  declarations: [
    AccountManagementPageComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [IdentityResolver]
})
export class UserInfoModule { }
