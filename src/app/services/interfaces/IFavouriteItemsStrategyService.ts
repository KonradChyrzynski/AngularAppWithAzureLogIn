import { IRemoveFavouriteItemStrategy } from "../../items-cards/design-patterns/strategies/favourite-items/interfaces/IRemoveFavouriteItemStrategy";

export interface  IFavoriteItemsEventStrategyService{
    setFavouriteItemsEventStrategy(favouriteItemsEventStrategy: IRemoveFavouriteItemStrategy): void
    getFavouriteItemsEventStrategy(): IRemoveFavouriteItemStrategy;
}