

import { PaginationService } from "src/app/services/pagination.service";
import { PaginationBaseStrategy } from "./base/pagination-base-strategy";
import { PaginationTextEnum } from "./enums/pagination-text-enum";
import { IPaginationStrategy } from "./interfaces/IPaginationStrategy";

export class PaginationDualRightStrategy extends PaginationBaseStrategy implements IPaginationStrategy{

    constructor(paginationService: PaginationService) {
        super(paginationService);
        super.setPaginationText(PaginationTextEnum.DualRightButton)
    }

    handleClick(): void {
        super.changePagination(2 * (this.numbeOfItemsInPage),2 * (this.numbeOfItemsInPage), 2);
        super.emmitChangePaginationEvent();
    }
}