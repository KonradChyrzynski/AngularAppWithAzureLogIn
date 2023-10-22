import { PaginationTextEnum } from "../enums/pagination-text-enum"

export interface IPaginationStrategy
{
    handleClick(): void   
    setPaginationText(paginationEnum: PaginationTextEnum): void
    getPaginationText(): string 
}