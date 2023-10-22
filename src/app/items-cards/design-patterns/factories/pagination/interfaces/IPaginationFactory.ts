import { IPaginationWrapper } from "src/app/interfaces/IPaginationWrapper";

export interface IPaginationWrapperFactory
{
    createLeftPaginationWrapper(): IPaginationWrapper;
    createDualLeftPaginationWrapper(): IPaginationWrapper;
    createRightPaginationWrapper(): IPaginationWrapper;
    createDualRightPaginationWrapper(): IPaginationWrapper;
    createMiddlePivotPaginationWrapper(): IPaginationWrapper;
    createSinglePagePaginationWrapper(): IPaginationWrapper;
}