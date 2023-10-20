import { Component, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { IBeer } from 'src/app/interfaces/IBeer';
import { FavouriteItemsService } from 'src/app/services/favourite-items.service';
import { IRemoveFavouriteItemStrategy } from '../design-patterns/strategies/interfaces/IRemoveFavouriteItemStrategy';

@Component({
  selector: 'app-add-item-to-favourite',
  templateUrl: './add-item-to-favourite.component.html',
  styleUrls: ['./add-item-to-favourite.component.scss']
})
export class AddItemToFavouriteComponent {

  @Input()
  item!: IBeer;

  @Input()
  favouriteItemRemovalStrategy!: IRemoveFavouriteItemStrategy; 

  constructor(private favouriteItemsService: FavouriteItemsService) {
  }

  handleStarClick(){
    this.item.favourite = !this.item.favourite;

    if(this.item.favourite)
    {
      this.favouriteItemsService.addToFavourite(this.item)
      return;
    }

    this.favouriteItemRemovalStrategy.handleFavouriteItemRemoval(this.item.id);
  }
}
