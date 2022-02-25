import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteDetailComponent } from './pages/quote-detail/quote-detail.component';
import { QuoteListComponent } from './pages/quote-list/quote-list.component';

const routes: Routes = [
  { path: "", component: QuoteListComponent },
  { path: "detalle/:id", component: QuoteDetailComponent },
  { path: "**", redirectTo: "" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
