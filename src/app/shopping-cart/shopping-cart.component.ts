import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/cart.service';
import { IBeer } from '../interfaces/IBeer';
import { IRemoveFavouriteItemStrategy } from '../items-cards/design-patterns/strategies/interfaces/IRemoveFavouriteItemStrategy';
import { RemoveFavouriteItemBaseStrategy } from '../items-cards/design-patterns/strategies/base/remove-favourite-items-base';
import { FavouriteItemsService } from '../services/favourite-items.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public items: IBeer[] = [];
  favouriteItemRemovalStrategy!: IRemoveFavouriteItemStrategy;
  constructor(private shoppingCartService: ShoppingCartService,
              favouriteItemsService: FavouriteItemsService 
    ) { 
      this.favouriteItemRemovalStrategy = new RemoveFavouriteItemBaseStrategy(favouriteItemsService);
  }

  async ngOnInit(): Promise<void> {
    this.items = await this.shoppingCartService.getItems();
   }

   calculateTotalPrice(): number{
      return this.shoppingCartService.totalPrice;
   }
}
