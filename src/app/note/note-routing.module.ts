import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotePageComponent } from "./pages/note-page/note-page.component";
import { NoteResolver } from "./core/resolvers/NoteResolver";

const routes: Routes = [
  {
    path: '',
    component: NotePageComponent,
    resolve: {
      notes: NoteResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
