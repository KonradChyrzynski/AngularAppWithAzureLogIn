import { Injectable } from '@angular/core';
import { IPaginationWrapperFactory } from '../items-cards/design-patterns/factories/pagination/interfaces/IPaginationFactory';
import { PaginationWrapperFactory } from '../items-cards/design-patterns/factories/pagination/PaginationWrapperFactory';
import { IPaginationWrapper } from '../interfaces/IPaginationWrapper';

@Injectable({
    providedIn: 'root'
  })
export class PaginationService {
    public beersIndexStart: number = 0;
    public beersIndexEnd: number = 6;
    public numbeOfItemsInPage: number = 6    

    private paginationWrapper!: IPaginationWrapper

    private paginationWrapperFactory!: IPaginationWrapperFactory  

    public numberOfPages!: number;
    public currentPage: number = 1;
    public changeFirstLi: boolean = true;
    public changeSecondLi: boolean = true;
    public changeThirdLi: boolean = true;

    constructor() {
      this.paginationWrapperFactory = new PaginationWrapperFactory(this)
    }

    calculateNumberOfPages(stock: number): void{
      this.numberOfPages = Math.ceil(stock / this.numbeOfItemsInPage);
    }

    setPaginationWrapper(){
      debugger;
      const isLast: boolean = this.currentPage + 1 > this.numberOfPages;
      const isFirst: boolean = this.currentPage === 1;
      const hasOneMoreRightPage: boolean = this.currentPage + 1 <= this.numberOfPages;
      const hasTwoMoreRightPages: boolean = this.currentPage + 2 < this.numberOfPages;
      const hasOneMoreLeftPage: boolean = this.currentPage - 1 > 0;
      const hasTwoMoreLeftPages: boolean = this.currentPage - 2 > 0;
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
      this.beersIndexStart = 0;
      this.beersIndexEnd = this.numbeOfItemsInPage;
      this.currentPage = 1
    }
}