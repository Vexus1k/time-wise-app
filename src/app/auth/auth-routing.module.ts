import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterPageComponent } from "./pages/login-register-page/login-register-page.component";

const routes: Routes = [
  {
    path: '',
    component: LoginRegisterPageComponent,
    children: [
      // Define child routes and their corresponding components here
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
