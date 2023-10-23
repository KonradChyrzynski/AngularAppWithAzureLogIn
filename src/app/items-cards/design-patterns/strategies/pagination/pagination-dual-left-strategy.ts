import { PaginationService } from "src/app/services/pagination.service";
import { PaginationBaseStrategy } from "./base/pagination-base-strategy";
import { IPaginationStrategy } from "./interfaces/IPaginationStrategy";
import { PaginationTextEnum } from "./enums/pagination-text-enum";

export class PaginationDualLeftStrategy extends PaginationBaseStrategy implements IPaginationStrategy{

    constructor(paginationService: PaginationService) {
        super(paginationService);
        super.setPaginationText(PaginationTextEnum.DualLeftButton)
    }
    
    handleClick(): void {
        super.changePagination(2 * (-this.numbeOfItemsInPage),2 * (-this.numbeOfItemsInPage), -2);
        super.emmitChangePaginationEvent();
    }
}