
import { IRemoveFavouriteItemStrategy } from "./interfaces/IRemoveFavouriteItemStrategy";
import { RemoveFavouriteItemBaseStrategy } from "./base/remove-favourite-items-base";
import { FavouriteItemsService } from "src/app/services/favourite-items.service";

export class RemoveFavouriteItemComponentStrategy extends RemoveFavouriteItemBaseStrategy  implements IRemoveFavouriteItemStrategy
{
    constructor(favouriteItemsService: FavouriteItemsService ){
        super(favouriteItemsService);
    }

    handleFavouriteItemRemoval(itemId: number): void{
        super.handleFavouriteItemRemoval(itemId);
        document.getElementById(`app-item-${itemId}`)?.remove();
    };
}