import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { IPaginationWrapper } from 'src/app/interfaces/IPaginationWrapper';
import { PaginationService } from 'src/app/services/pagination.service';
import { IPaginationStrategy } from '../design-patterns/strategies/pagination/interfaces/IPaginationStrategy';
import { PaginationFactoryService } from 'src/app/services/pagination.factory.service';
import { Observable } from 'rxjs';

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
  public paginationWrapper$!: Observable<IPaginationWrapper>
  public paginationStrategies!: IPaginationStrategy[]
  public paginationStrategies$!: Observable<IPaginationStrategy[]>

  constructor(private paginationService: PaginationService, private paginationFactoryService: PaginationFactoryService){

  }

  ngOnInit(): void {
    this.paginationService.calculateNumberOfPages(this.stock);
    this.paginationFactoryService.setPaginationWrapper()
    this.paginationWrapper = this.paginationFactoryService.getPaginationWrapper();
    this.paginationWrapper$ = this.paginationFactoryService.getPaginationWrapper$();
    this.paginationStrategies = Object.values(this.paginationWrapper).filter(value => value !== null);
    this.paginationStrategies$ = this.paginationFactoryService.getPaginationStrategies$()
  }

  async changePage(){
    this.changePaginationEvent.emit()
    const waitFor = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));
    await waitFor(5)
    this.paginationFactoryService.setPaginationWrapper()
    this.paginationWrapper = this.paginationFactoryService.getPaginationWrapper();
    this.paginationStrategies = Object.values(this.paginationWrapper).filter(value => value !== null);
  }
}
