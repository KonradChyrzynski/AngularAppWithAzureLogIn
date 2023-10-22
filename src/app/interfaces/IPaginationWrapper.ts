import { IPaginationStrategy } from "../items-cards/design-patterns/strategies/pagination/interfaces/IPaginationStrategy";

export interface IPaginationWrapper{
    PreviousButtonStrategy: IPaginationStrategy | null
    FirstButtonStrategy: IPaginationStrategy | null
    SecondButtonStrategy: IPaginationStrategy | null
    ThirdButtonStrategy: IPaginationStrategy | null
    NextButtonStrategy: IPaginationStrategy | null
}