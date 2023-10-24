import { PaginationService } from "src/app/services/pagination.service";
import { PaginationBaseStrategy } from "./base/pagination-base-strategy";
import { IPaginationStrategy } from "./interfaces/IPaginationStrategy";
import { PaginationTextEnum } from "./enums/pagination-text-enum";

export class PaginationRightStrategy extends PaginationBaseStrategy implements IPaginationStrategy{

    constructor(paginationService: PaginationService) {
        super(paginationService);
        super.setPaginationText(PaginationTextEnum.RightButton)
    }

    handleClick(): void {
        super.changePagination( this.numberOfItemsInPage, this.numberOfItemsInPage, 1);
        super.emmitChangePaginationEvent();
    }
}