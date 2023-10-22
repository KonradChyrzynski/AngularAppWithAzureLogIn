import { Component } from '@angular/core';
import { IItemsStrategy } from '../items-cards/design-patterns/strategies/favourite-items/interfaces/IItemsStrategy';
import { FavouriteItemsStrategy } from '../items-cards/design-patterns/strategies/favourite-items/favourite-items-strategy';
import { PaginationService } from '../services/pagination.service';
import { FavouriteItemsService } from '../services/favourite-items.service';
import { IBeer } from '../interfaces/IBeer';
import { RemoveFavouriteItemComponentStrategy  } from '../items-cards/design-patterns/strategies/favourite-items/remove-favourite-items-route-strategy';
import { FavouriteItemsEventStrategyService } from '../services/favourite-items-strategy.service';

@Component({
  selector: 'favourite-items',
  templateUrl: './favourite-items.component.html',
  styleUrls: ['./favourite-items.component.scss']
})
export class FavouriteItemsComponent  {
  beers: IBeer[] = [];

  ItemsStrategy!: IItemsStrategy;

  constructor(
    favouriteItemsService: FavouriteItemsService, 
    paginationService: PaginationService,
    favouriteItemsEventStrategyService: FavouriteItemsEventStrategyService
    ) {
    this.ItemsStrategy = new FavouriteItemsStrategy(favouriteItemsService, paginationService);
    favouriteItemsEventStrategyService.setFavouriteItemsEventStrategy(new RemoveFavouriteItemComponentStrategy(favouriteItemsService));
  }
}
