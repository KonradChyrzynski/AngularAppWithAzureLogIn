import { Component, Input } from '@angular/core';
import { IBeer } from 'src/app/interfaces/IBeer';
import { FavouriteItemsService } from 'src/app/services/favourite-items.service';
import { IRemoveFavouriteItemStrategy } from '../design-patterns/strategies/favourite-items/interfaces/IRemoveFavouriteItemStrategy';
import { FavouriteItemsEventStrategyService } from 'src/app/services/favourite-items-strategy.service';

@Component({
  selector: 'app-add-item-to-favourite',
  templateUrl: './add-item-to-favourite.component.html',
  styleUrls: ['./add-item-to-favourite.component.scss']
})
export class AddItemToFavouriteComponent {

  @Input()
  item!: IBeer;

  favouriteItemRemovalStrategy!: IRemoveFavouriteItemStrategy; 

  constructor(private favouriteItemsService: FavouriteItemsService, favouriteItemsEventStrategyService: FavouriteItemsEventStrategyService) {
    this.favouriteItemRemovalStrategy = favouriteItemsEventStrategyService.getFavouriteItemsEventStrategy();
  }

  handleStarClick(): void {
    this.item.favourite = !this.item.favourite;

    if(this.item.favourite)
    {
      this.favouriteItemsService.addToFavourite(this.item)
      return;
    }

    this.favouriteItemRemovalStrategy.handleFavouriteItemRemoval(this.item.id);
  }
}
