import { Component, Input, OnInit } from '@angular/core';
import { QuoteList } from '../../interfaces/QuoteList';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {
  @Input() quote!: QuoteList;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMarker() {  
    this.quote.marked = !this.quote.marked;
  }
}
