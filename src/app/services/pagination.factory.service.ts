import { Injectable, inject } from '@angular/core';
import { IPaginationWrapperFactory } from '../items-cards/design-patterns/factories/pagination/interfaces/IPaginationFactory';
import { PaginationWrapperFactory } from '../items-cards/design-patterns/factories/pagination/PaginationWrapperFactory';
import { IPaginationWrapper } from '../interfaces/IPaginationWrapper';
import { PaginationService } from './pagination.service';

@Injectable({
    providedIn: 'root'
  })
export class PaginationFactoryService {

    private paginationWrapper!: IPaginationWrapper
    private paginationWrapperFactory!: IPaginationWrapperFactory  
    constructor(
      private paginationService: PaginationService
    ) {

      this.paginationWrapperFactory = new PaginationWrapperFactory(paginationService)
    }

    calculateNumberOfPages(stock: number): void{
      this.paginationService.numberOfPages = Math.ceil(stock / this.paginationService.numberOfItemsInPage);
    }

    setPaginationWrapper(){
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
        return
      }

      const PaginationRightFlag = hasOneMoreRightPage && isFirst;

      if(PaginationRightFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createRightPaginationWrapper()
        return
      }

      const PaginationMiddlePivotFlag: boolean =  hasOneMoreRightPage
        && hasOneMoreLeftPage && !isLast && !isFirst; 

      if(PaginationMiddlePivotFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createMiddlePivotPaginationWrapper();
        return
      }

      const PaginationDualLeftFlag: boolean = hasTwoMoreLeftPages && isLast;

      if(PaginationDualLeftFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createDualLeftPaginationWrapper();
        return
      }
      const PaginationLeftFlag: boolean =  hasOneMoreLeftPage && isLast;

      if(PaginationLeftFlag){
        this.paginationWrapper = this.paginationWrapperFactory.createLeftPaginationWrapper();
        return
      }

      const PaginationSinglePageFLag: boolean = isLast && isFirst; 

      if(PaginationSinglePageFLag){
        this.paginationWrapper = this.paginationWrapperFactory.createSinglePagePaginationWrapper();
        return
      }
    }

    public getPaginationWrapper(): IPaginationWrapper {
      return this.paginationWrapper;
    }

    resetPagination(){
      this.paginationService.beersIndexStart = 0;
      this.paginationService.beersIndexEnd = this.paginationService.numberOfItemsInPage;
      this.paginationService.currentPage = 1
    }
}