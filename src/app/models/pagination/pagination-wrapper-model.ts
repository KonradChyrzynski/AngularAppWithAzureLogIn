import { IPaginationWrapper } from "src/app/interfaces/IPaginationWrapper";
import { IPaginationStrategy } from "src/app/items-cards/design-patterns/strategies/pagination/interfaces/IPaginationStrategy";

export class PaginationWrapperModel implements IPaginationWrapper{
    PreviousButtonStrategy: IPaginationStrategy | null = null;
    FirstButtonStrategy: IPaginationStrategy | null = null;
    SecondButtonStrategy: IPaginationStrategy | null = null;
    ThirdButtonStrategy: IPaginationStrategy | null = null;
    NextButtonStrategy: IPaginationStrategy | null = null;
}