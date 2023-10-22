import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPaginationStrategy } from '../../design-patterns/strategies/pagination/interfaces/IPaginationStrategy';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.scss']
})
export class PaginationButtonComponent implements OnInit {


  @Output() changePaginationEvent = new EventEmitter();
  
  @Input()
  paginationStrategy!: IPaginationStrategy | null;

  public paginationText!: string;

  constructor() {
   }

  ngOnInit(): void {
    this.paginationText = this.paginationStrategy!.getPaginationText()
  }

  handleClick(){
    this.paginationStrategy!.handleClick();
    this.changePaginationEvent.emit();
  }
}
