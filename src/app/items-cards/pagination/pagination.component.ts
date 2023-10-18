import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Output() changePaginationEvent = new EventEmitter();
  @Input()
  stock!: number; 

  public currentPage: number = 1;

  public numberOfPages!: number;
  public changeFirstLi: boolean = true;
  public changeSecondLi: boolean = true;
  public changeThirdLi: boolean = true;

  constructor(private paginationService: PaginationService) {

  }

  ngOnInit(): void {
    this.numberOfPages = this.calculateNumberOfPages();
    this.checkLiDisplay();
  }

  calculateNumberOfPages(): number{
    return Math.ceil(this.stock / 6);
  }

  changeToNextPage(): void {
    this.changePagination(6,6, 1);
    this.changePaginationEvent.emit()
  }

  changeToPreviousPage(){
    this.changePagination(-6,-6, -1);
    this.changePaginationEvent.emit()
  }

  firstLiClickHandler(): void {
    this.changePaginationEvent.emit()
  }

  secondLiClickHandler(): void {
    this.changePagination(6,6, 1);
    this.changePaginationEvent.emit()
  }

  thirdLiClickHandler(): void {
    this.changePagination(2*6,2*6, 2);
    this.changePaginationEvent.emit()
  }

  changePagination(startIndex: number, endIndex: number, currentPage: number){
    this.paginationService.beersIndexStart += startIndex;
    this.paginationService.beersIndexEnd += endIndex;
    console.log(this.paginationService.beersIndexEnd);
    this.currentPage += currentPage;
    this.checkLiDisplay()
  }

  checkLiDisplay(){
    if(this.currentPage + 2 > this.numberOfPages || this.currentPage + 1 > this.numberOfPages){
      this.changeThirdLi = false;
    }else{
      this.changeThirdLi = true;
    }
    if(this.currentPage + 1 > this.numberOfPages){
      this.changeSecondLi = false;
    }else{
      this.changeSecondLi = true
    }
  } 

}
