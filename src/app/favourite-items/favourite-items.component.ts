import { Component } from '@angular/core';
import { IItemsStrategy } from '../items-cards/design-patterns/strategies/interfaces/IItemsStrategy';
import { FavouriteItemsStrategy } from '../items-cards/design-patterns/strategies/favourite-items-strategy';
import { PaginationService } from '../services/pagination.service';
import { FavouriteItemsService } from '../services/favourite-items.service';
import { IBeer } from '../interfaces/IBeer';

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
    paginationService: PaginationService
    ) {
    this.ItemsStrategy = new FavouriteItemsStrategy(favouriteItemsService, paginationService);
  }
}
