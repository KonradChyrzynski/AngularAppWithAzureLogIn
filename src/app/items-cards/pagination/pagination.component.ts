import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { IPaginationWrapper } from 'src/app/interfaces/IPaginationWrapper';
import { PaginationService } from 'src/app/services/pagination.service';
import { IPaginationStrategy } from '../design-patterns/strategies/pagination/interfaces/IPaginationStrategy';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  stock!: number; 

  @Output() changePaginationEvent = new EventEmitter();

  public paginationWrapper!: IPaginationWrapper
  public paginationStrategies!: IPaginationStrategy[]

  constructor(private paginationService: PaginationService){

  }

  ngOnInit(): void {
    this.paginationService.calculateNumberOfPages(this.stock);
    this.paginationService.setPaginationWrapper()
    this.paginationWrapper = this.paginationService.getPaginationWrapper();
    this.paginationStrategies = Object.values(this.paginationWrapper).filter(value => value !== null);
  }

  async changePage(){
    this.paginationService.paginationChanged = false
    this.changePaginationEvent.emit()
    const waitFor = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));
    await waitFor(0)
    this.paginationService.setPaginationWrapper()
    this.paginationWrapper = this.paginationService.getPaginationWrapper();
    this.paginationStrategies = Object.values(this.paginationWrapper).filter(value => value !== null);
  }
}
