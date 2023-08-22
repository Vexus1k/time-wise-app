import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionPageComponent } from "./pages/suggestion-page/suggestion-page.component";
import { SuggestionResolver } from "./core/resolvers/SuggestionResolver";

const routes: Routes = [
  {
    path: '',
    component: SuggestionPageComponent,
    resolve: {
      suggestions: SuggestionResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionRoutingModule { }
