import { IFavoriteItemsEventStrategyService } from "./interfaces/IFavouriteItemsStrategyService";
import { IRemoveFavouriteItemStrategy } from "../items-cards/design-patterns/strategies/interfaces/IRemoveFavouriteItemStrategy";
export class FavouriteItemsEventStrategyService implements IFavoriteItemsEventStrategyService{

    private favouriteItemsEventStrategy: IRemoveFavouriteItemStrategy | undefined;

    public setFavouriteItemsEventStrategy(favouriteItemsEventStrategy: IRemoveFavouriteItemStrategy): void {
        this.favouriteItemsEventStrategy = favouriteItemsEventStrategy;
    }

    public getFavouriteItemsEventStrategy(): IRemoveFavouriteItemStrategy {
        return this.favouriteItemsEventStrategy!;
    }
}