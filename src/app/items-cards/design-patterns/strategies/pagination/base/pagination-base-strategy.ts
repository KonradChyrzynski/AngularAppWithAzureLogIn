import { EventEmitter, Injectable, Output } from "@angular/core";
import { PaginationService } from "src/app/services/pagination.service";
import { PaginationTextEnum } from "../enums/pagination-text-enum";

@Injectable()
export abstract class PaginationBaseStrategy {

    public numberOfPages!: number;
    public numberOfItemsInPage: number = 0   
    private paginationComponentText : string = "";
    private currentPage: boolean = false;

    constructor(private paginationService: PaginationService) {
      this.numberOfItemsInPage = paginationService.numberOfItemsInPage
    }

    @Output() changePaginationEvent = new EventEmitter();

    emmitChangePaginationEvent(){
        this.changePaginationEvent.emit()
    }

    changePagination(startIndex: number, endIndex: number, changePageBy: number){
      this.paginationService.changePagination(startIndex, endIndex, changePageBy)
    }

    public setPaginationText(paginationTextType: PaginationTextEnum){
      switch(paginationTextType){
        case  PaginationTextEnum.NextButton:
          this.paginationComponentText = "Next";
            break;
        case PaginationTextEnum.PreviousButton:
          this.paginationComponentText = "Previous";
            break;
        case PaginationTextEnum.LeftButton:
          this.paginationComponentText = String(this.paginationService.currentPage - 1)
            break;
        case PaginationTextEnum.DualLeftButton:
          this.paginationComponentText = String(this.paginationService.currentPage - 2)
            break;
        case PaginationTextEnum.RightButton:
          this.paginationComponentText = String(this.paginationService.currentPage + 1)
            break;
        case PaginationTextEnum.DualRightButton:
          this.paginationComponentText = String(this.paginationService.currentPage + 2)
            break;
        case PaginationTextEnum.PasiveButton:
          this.paginationComponentText = String(this.paginationService.currentPage)
            break;
      }
    }

    public setAsCurrentPage() {
      this.currentPage = true;
    }

    public getCurrentPageFlag() {
      return this.currentPage;
    }

    getPaginationText(): string{
      return this.paginationComponentText;
    }
}