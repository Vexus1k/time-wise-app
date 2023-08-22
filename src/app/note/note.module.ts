import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { NoteRoutingModule } from "./note-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NoteResolver } from "./core/resolvers/NoteResolver";



@NgModule({
  declarations: [
    NotePageComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule
  ],
  providers: [NoteResolver]
})
export class NoteModule { }
