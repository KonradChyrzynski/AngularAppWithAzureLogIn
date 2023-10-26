
import { FavouriteItemsService } from "src/app/services/favourite-items.service";
import { IRemoveFavouriteItemStrategy } from "../interfaces/IRemoveFavouriteItemStrategy";

export class RemoveFavouriteItemBaseStrategy implements IRemoveFavouriteItemStrategy
{

    constructor(protected favouriteItemsService: FavouriteItemsService ) {

    }

    handleFavouriteItemRemoval(itemId: number): void{
        this.favouriteItemsService.removeFromFavourite(itemId);
    };
}