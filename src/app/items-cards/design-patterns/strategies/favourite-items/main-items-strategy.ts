import { BeerService } from "src/app/services/beer.service";
import { IItemsStrategy } from "./interfaces/IItemsStrategy";
import { IBeer } from "src/app/interfaces/IBeer";
import { PaginationService } from "src/app/services/pagination.service";
import { Observable } from "rxjs";

export class MainItemsStrategy  implements IItemsStrategy { 

    private items: IBeer[] = [];
    private showPaginationFlag: boolean = false;
    private totalItems: number = 0;
    constructor(private _beer: BeerService, private paginationService: PaginationService ){

    }

    showPagination(): boolean {
      throw new Error("Method not implemented.");
    }

    getItems$(): Observable<IBeer[]>{
      return this._beer.items$;
    }

    async getItems(): Promise<IBeer[]> {
      
        // Simulate synchronous behavior by blocking until the promise is resolved
        await this._beer.getItems()
          .then((itemsResponse: IBeer[]) => {
            this.showPaginationFlag = itemsResponse.length >= 1;
            this.totalItems = itemsResponse.length;
            this.items = itemsResponse.slice(
              this.paginationService.beersIndexStart, 
              this.paginationService.beersIndexEnd
              );
          })
          .catch(error => {
            console.error('Error fetching items:', error);
            throw error;
          });
      
        this._beer.items$.next(Array.from(this.items))

        return this.items;
    }

    showPaginationObservable(): Observable<boolean>{
        return new Observable<boolean>((observer) => {
            observer.next(this.showPaginationFlag)
        })
    }

    async getTotalItems(): Promise<number>{
        await this._beer.getTotalItems().then((items: number) =>
        {
            this.totalItems = items;
        })
         .catch((error => {
                    console.error(error);
                    throw error;
                }));;

        return this.totalItems;
    }
}