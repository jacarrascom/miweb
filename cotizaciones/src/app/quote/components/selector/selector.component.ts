import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  @Output() onChange = new EventEmitter();

  @Input() options: SelectorOption[] = [];
  open = false;
  selected!: SelectorOption;

  constructor() {}

  ngOnInit(): void {
    this.selected = this.options[0];
  }
  
  selectOption(opt: SelectorOption) {
    this.open = false;
    this.selected = opt;
    this.onChange.emit(opt);
  }
}


export interface SelectorOption {
  caption: string;
  value: any;
}