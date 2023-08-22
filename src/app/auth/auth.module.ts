import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    LoginRegisterPageComponent
  ],
  exports: [
    LoginRegisterPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule
  ]
})
export class AuthModule { }
