import { IBeer } from "src/app/interfaces/IBeer";

export interface IItemsStrategy
{
    getItems(): Promise<IBeer[]> 
    showPagination(): boolean;
    getTotalItems(): number;
}