import { Component } from '@angular/core';
import { MainItemsStrategy } from '../items-cards/design-patterns/strategies/main-items-strategy';
import { IItemsStrategy } from '../items-cards/design-patterns/strategies/interfaces/IItemsStrategy';
import { PaginationService } from '../services/pagination.service';
import { BeerService } from '../services/beer.service';
import { RemoveFavouriteItemBaseStrategy } from '../items-cards/design-patterns/strategies/base/remove-favourite-items-base';
import { FavouriteItemsService } from '../services/favourite-items.service';
import { FavouriteItemsEventStrategyService } from '../services/favourite-items-strategy.service';

@Component({
  selector: 'app-main-items-layout',
  templateUrl: './main-items-layout.component.html',
  styleUrls: ['./main-items-layout.component.scss']
})
export class MainItemsLayoutComponent {

  ItemsStrategy!: IItemsStrategy; 

  constructor(
        paginationService: PaginationService,
        bearService: BeerService,
        favouriteItemsService: FavouriteItemsService ,
        favouriteItemsEventStrategyService: FavouriteItemsEventStrategyService
        )
      {
          this.ItemsStrategy = new MainItemsStrategy(bearService,paginationService);

          favouriteItemsEventStrategyService
            .setFavouriteItemsEventStrategy(new RemoveFavouriteItemBaseStrategy(favouriteItemsService));
      }
}
