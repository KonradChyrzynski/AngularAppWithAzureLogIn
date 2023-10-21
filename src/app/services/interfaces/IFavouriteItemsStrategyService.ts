import { IRemoveFavouriteItemStrategy } from "../../items-cards/design-patterns/strategies/interfaces/IRemoveFavouriteItemStrategy";

export interface  IFavoriteItemsEventStrategyService{
    setFavouriteItemsEventStrategy(favouriteItemsEventStrategy: IRemoveFavouriteItemStrategy): void
    getFavouriteItemsEventStrategy(): IRemoveFavouriteItemStrategy;
}