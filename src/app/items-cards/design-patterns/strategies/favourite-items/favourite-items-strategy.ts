import { IBeer } from "src/app/interfaces/IBeer";
import { IItemsStrategy } from "./interfaces/IItemsStrategy";
import { FavouriteItemsService } from "src/app/services/favourite-items.service";
import { PaginationService } from "src/app/services/pagination.service";

export class FavouriteItemsStrategy  implements IItemsStrategy  {

    private items!: IBeer[];  
    private showPaginationFlag: boolean = false;
    private totalItems: number = 0;

    constructor(private favItemsService: FavouriteItemsService ,
        private paginationService: PaginationService) {
    }

    async getItems(): Promise<IBeer[]>
    {
         await this.favItemsService.getFavouriteItems()
         .then((itemsResponse: IBeer[]) =>
         {

            const itemsLengt: number = itemsResponse.length
            this.showPaginationFlag = itemsLengt > 6;

            this.totalItems = itemsLengt;
            this.items = itemsResponse.slice(
                this.paginationService.beersIndexStart,
                this.paginationService.beersIndexEnd
                )
         })
         .catch((error => {
                    console.error(error);
                    throw error;
                }));;

         return this.items;
    }

    async getTotalItems(): Promise<number>{
        await this.favItemsService.getTotalItems().then((items: number) =>
        {
            this.totalItems = items;
        })
         .catch((error => {
                    console.error(error);
                    throw error;
                }));;

        return this.totalItems;
    }

    showPagination(): boolean{
          return this.showPaginationFlag;
    }

}