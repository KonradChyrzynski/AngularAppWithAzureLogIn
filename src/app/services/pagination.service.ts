import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PaginationService {
    public beersIndexStart: number = 0;
    public beersIndexEnd: number = 6;
    public numberOfItemsInPage: number = 6    
    public paginationChanged: boolean = false;

    public numberOfPages!: number;
    public currentPage: number = 1;

    constructor() {
    }

    calculateNumberOfPages(stock: number): void{
      this.numberOfPages = Math.ceil(stock / this.numberOfItemsInPage);
    }

    resetPagination(){
      this.beersIndexStart = 0;
      this.beersIndexEnd = this.numberOfItemsInPage;
      this.currentPage = 1
    }
}