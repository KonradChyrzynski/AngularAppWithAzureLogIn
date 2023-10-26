import { Injectable } from '@angular/core';
import { IPaginationWrapperFactory } from '../items-cards/design-patterns/factories/pagination/interfaces/IPaginationFactory';
import { PaginationWrapperFactory } from '../items-cards/design-patterns/factories/pagination/PaginationWrapperFactory';
import { IPaginationWrapper } from '../interfaces/IPaginationWrapper';
import { PaginationService } from './pagination.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPaginationStrategy } from '../items-cards/design-patterns/strategies/pagination/interfaces/IPaginationStrategy';

@Injectable({
    providedIn: 'root'
  })
export class PaginationFactoryService {

    private paginationWrapper!: IPaginationWrapper
    private paginationWrapper$!: BehaviorSubject<IPaginationWrapper>
    private paginationWrapperFactory!: IPaginationWrapperFactory  
    private paginationStrategies$!: BehaviorSubject<IPaginationStrategy[]>

    constructor(
      private paginationService: PaginationService
    ) {
        this.paginationWrapperFactory = new PaginationWrapperFactory(paginationService)
      }

    calculateNumberOfPages(stock: number): void{
      this.paginationService.numberOfPages = Math.ceil(stock / this.paginationService.numberOfItemsInPage);
    }

    public setPaginationWrapper(){
      const isLast: boolean = this.paginationService.currentPage + 1 > this.paginationService.numberOfPages;
      const isFirst: boolean = this.paginationService.currentPage === 1;
      const hasOneMoreRightPage: boolean = this.paginationService.currentPage + 1 <= this.paginationService.numberOfPages;
      const hasTwoMoreRightPages: boolean = this.paginationService.currentPage + 2 < this.paginationService.numberOfPages;
      const hasOneMoreLeftPage: boolean = this.paginationService.currentPage - 1 > 0;
      const hasTwoMoreLeftPages: boolean = this.paginationService.currentPage - 2 > 0;
      const PaginationDualRightFlag = hasTwoMoreRightPages
        && isFirst;

      if(PaginationDualRightFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createDualRightPaginationWrapper()
        this.changePaginationSubjects()
        return
      }

      const PaginationRightFlag = hasOneMoreRightPage && isFirst;

      if(PaginationRightFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createRightPaginationWrapper()
        this.changePaginationSubjects()
        return
      }

      const PaginationMiddlePivotFlag: boolean =  hasOneMoreRightPage
        && hasOneMoreLeftPage && !isLast && !isFirst; 

      if(PaginationMiddlePivotFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createMiddlePivotPaginationWrapper();
        this.changePaginationSubjects();
        return
      }

      const PaginationDualLeftFlag: boolean = hasTwoMoreLeftPages && isLast;

      if(PaginationDualLeftFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createDualLeftPaginationWrapper();
        this.changePaginationSubjects();
        return
      }
      const PaginationLeftFlag: boolean =  hasOneMoreLeftPage && isLast;

      if(PaginationLeftFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createLeftPaginationWrapper();
        this.changePaginationSubjects();
        return
      }

      const PaginationSinglePageFLag: boolean = isLast && isFirst; 

      if(PaginationSinglePageFLag){
        this.paginationWrapper = this.paginationWrapperFactory.createSinglePagePaginationWrapper();
        this.changePaginationSubjects();
        return
      }
    }

    private changePaginationSubjects(){
        if(this.paginationStrategies$ === null || this.paginationStrategies$ === undefined){
          this.paginationStrategies$ = new BehaviorSubject(Object.values(this.paginationWrapper).filter(value => value !== null));
        }
        else{
          this.paginationStrategies$.next(Object.values(this.paginationWrapper).filter(value => value !== null))
        }

        if(this.paginationWrapper$ === null || this.paginationWrapper$ === undefined){
          this.paginationWrapper$ = new BehaviorSubject(this.paginationWrapper)
          return
        }
        
        this.paginationWrapper$.next(this.paginationWrapper)
    }

    public getPaginationWrapper(): IPaginationWrapper {
      return this.paginationWrapper;
    }

    public getPaginationStrategies$(): Observable<IPaginationStrategy[]>{
      return this.paginationStrategies$;
    }

    public getPaginationWrapper$(): Observable<IPaginationWrapper>{
      return this.paginationWrapper$;
    }

    resetPagination(){
      this.paginationService.beersIndexStart = 0;
      this.paginationService.beersIndexEnd = this.paginationService.numberOfItemsInPage;
      this.paginationService.currentPage = 1
    }
}