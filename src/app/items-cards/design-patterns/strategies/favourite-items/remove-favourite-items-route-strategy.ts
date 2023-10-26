
import { IRemoveFavouriteItemStrategy } from "./interfaces/IRemoveFavouriteItemStrategy";
import { RemoveFavouriteItemBaseStrategy } from "./base/remove-favourite-items-base";
import { FavouriteItemsService } from "src/app/services/favourite-items.service";
import { PaginationService } from "src/app/services/pagination.service";
import { PaginationFactoryService } from "src/app/services/pagination.factory.service";

export class RemoveFavouriteItemComponentStrategy extends RemoveFavouriteItemBaseStrategy  implements IRemoveFavouriteItemStrategy
{
    constructor(favouriteItemsService: FavouriteItemsService, private paginationService: PaginationService, private paginationWrapperFactory: PaginationFactoryService ){
        super(favouriteItemsService);
    }

    handleFavouriteItemRemoval(itemId: number): void{
        super.handleFavouriteItemRemoval(itemId);
        this.paginationService.calculateNumberOfPages(this.favouriteItemsService.items.size)
        this.paginationWrapperFactory.setPaginationWrapper()
        document.getElementById(`app-item-${itemId}`)?.remove();
    };
}