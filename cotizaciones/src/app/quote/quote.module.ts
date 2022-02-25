import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuoteRoutingModule} from './quote-routing.module';
import {QuoteListComponent} from './pages/quote-list/quote-list.component';
import {QuoteDetailComponent} from './pages/quote-detail/quote-detail.component';
import {QuoteCardComponent} from './components/quote-card/quote-card.component';
import {SelectorComponent} from './components/selector/selector.component';
import {AccordionComponent} from './components/accordion/accordion.component';
import {FormsModule} from '@angular/forms';
import {FormatNumberPipe} from './pipes/format-number.pipe';
import {QuoteService} from "./services/quote.service";

@NgModule({
  declarations: [
    QuoteListComponent,
    QuoteDetailComponent,
    QuoteCardComponent,
    SelectorComponent,
    AccordionComponent,
    FormatNumberPipe,
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    FormsModule
  ],
  providers: [
    QuoteService
  ]
})
export class QuoteModule {
}
