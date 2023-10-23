import { PaginationTextEnum } from "../enums/pagination-text-enum"

export interface IPaginationStrategy
{
    handleClick(): void   
    setPaginationText(paginationEnum: PaginationTextEnum): void
    setAsCurrentPage(): void
    getCurrentPageFlag(): boolean
    getPaginationText(): string 
}