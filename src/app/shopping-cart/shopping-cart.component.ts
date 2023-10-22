import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/cart.service';
import { IBeer } from '../interfaces/IBeer';
import { RemoveFavouriteItemBaseStrategy } from '../items-cards/design-patterns/strategies/favourite-items/base/remove-favourite-items-base';
import { FavouriteItemsService } from '../services/favourite-items.service';
import { FavouriteItemsEventStrategyService } from '../services/favourite-items-strategy.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public items: IBeer[] = [];

  constructor(private shoppingCartService: ShoppingCartService,
              favouriteItemsService: FavouriteItemsService,
              favouriteItemsEventStrategyService: FavouriteItemsEventStrategyService
    ) { 
          favouriteItemsEventStrategyService
            .setFavouriteItemsEventStrategy(new RemoveFavouriteItemBaseStrategy(favouriteItemsService));
  }

  async ngOnInit(): Promise<void> {
    this.items = await this.shoppingCartService.getItems();
   }

   calculateTotalPrice(): number{
      return this.shoppingCartService.totalPrice;
   }
}
