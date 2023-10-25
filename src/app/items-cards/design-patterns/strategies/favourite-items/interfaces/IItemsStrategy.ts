import { Observable } from "rxjs";
import { IBeer } from "src/app/interfaces/IBeer";

export interface IItemsStrategy
{
    getItems(): Promise<IBeer[]> 
    showPagination(): boolean;
    showPaginationObservable(): Observable<boolean>;
    getTotalItems(): Promise<number>;
}