import { IPaginationWrapper } from "src/app/interfaces/IPaginationWrapper";
import { IPaginationWrapperFactory } from "./interfaces/IPaginationFactory";
import { PaginationService } from "src/app/services/pagination.service";
import { PaginationPassiveStrategy } from "../../strategies/pagination/pagination-pasive-strategy";
import { PaginationLeftStrategy } from "../../strategies/pagination/pagination-left-strategy";
import { PaginationDualLeftStrategy } from "../../strategies/pagination/pagination-dual-left-strategy";
import { PaginationRightStrategy } from "../../strategies/pagination/pagination-right-strategy";
import { PaginationDualRightStrategy } from "../../strategies/pagination/pagination-dual-right-strategy";
import { PaginationTextEnum } from "../../strategies/pagination/enums/pagination-text-enum";

export class PaginationWrapperFactory implements IPaginationWrapperFactory {

    constructor(private paginationService: PaginationService) {}

    createLeftPaginationWrapper(): IPaginationWrapper {
        const paginationWrapper: IPaginationWrapper = {
            PreviousButtonStrategy:  new PaginationLeftStrategy(this.paginationService),
            FirstButtonStrategy: new PaginationLeftStrategy(this.paginationService),
            SecondButtonStrategy: new PaginationPassiveStrategy(this.paginationService),
            ThirdButtonStrategy: null,
            NextButtonStrategy: null
        }
        paginationWrapper.PreviousButtonStrategy!.setPaginationText(PaginationTextEnum.PreviousButton)
        return paginationWrapper;
    }

    createDualLeftPaginationWrapper(): IPaginationWrapper {
        const paginationWrapper: IPaginationWrapper = {
            PreviousButtonStrategy:  new PaginationLeftStrategy(this.paginationService),
            FirstButtonStrategy: new PaginationDualLeftStrategy(this.paginationService),
            SecondButtonStrategy: new PaginationLeftStrategy(this.paginationService),
            ThirdButtonStrategy: new PaginationPassiveStrategy(this.paginationService),
            NextButtonStrategy: null
        }

        paginationWrapper.PreviousButtonStrategy!.setPaginationText(PaginationTextEnum.PreviousButton)

        return paginationWrapper 
    }

    createRightPaginationWrapper(): IPaginationWrapper {
        const paginationWrapper = {
            PreviousButtonStrategy: null,
            FirstButtonStrategy: new PaginationPassiveStrategy(this.paginationService), 
            SecondButtonStrategy: new PaginationRightStrategy(this.paginationService),
            ThirdButtonStrategy: null,
            NextButtonStrategy: new PaginationRightStrategy(this.paginationService),
        }

        paginationWrapper.NextButtonStrategy!.setPaginationText(PaginationTextEnum.NextButton)

        return paginationWrapper
    }

    createDualRightPaginationWrapper(): IPaginationWrapper {
        const paginationWrapper: IPaginationWrapper = {
            PreviousButtonStrategy: null,
            FirstButtonStrategy: new PaginationPassiveStrategy(this.paginationService), 
            SecondButtonStrategy: new PaginationRightStrategy(this.paginationService),
            ThirdButtonStrategy: new PaginationDualRightStrategy(this.paginationService),
            NextButtonStrategy: new PaginationRightStrategy(this.paginationService)
        }
        paginationWrapper.NextButtonStrategy!.setPaginationText(PaginationTextEnum.NextButton)

        return paginationWrapper
    }

    createMiddlePivotPaginationWrapper(): IPaginationWrapper {
        const paginationWrapper: IPaginationWrapper = {
            PreviousButtonStrategy: new PaginationLeftStrategy(this.paginationService),
            FirstButtonStrategy: new PaginationLeftStrategy(this.paginationService),
            SecondButtonStrategy: new PaginationPassiveStrategy(this.paginationService), 
            ThirdButtonStrategy: new PaginationRightStrategy(this.paginationService),
            NextButtonStrategy: new PaginationRightStrategy(this.paginationService)
        }

        paginationWrapper.PreviousButtonStrategy!.setPaginationText(PaginationTextEnum.PreviousButton)
        paginationWrapper.NextButtonStrategy!.setPaginationText(PaginationTextEnum.NextButton)

        return paginationWrapper
    }

    createSinglePagePaginationWrapper(): IPaginationWrapper {
        return {
            PreviousButtonStrategy: null,
            FirstButtonStrategy: new PaginationPassiveStrategy(this.paginationService), 
            SecondButtonStrategy: null,
            ThirdButtonStrategy: null,
            NextButtonStrategy: null,
        }
    }
}