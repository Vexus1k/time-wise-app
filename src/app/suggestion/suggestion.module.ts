import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionPageComponent } from './pages/suggestion-page/suggestion-page.component';
import { SuggestionRoutingModule } from "./suggestion-routing.module";
import { SuggestionResolver } from "./core/resolvers/SuggestionResolver";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    SuggestionPageComponent
  ],
  imports: [
    CommonModule,
    SuggestionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SuggestionResolver]
})
export class SuggestionModule { }
