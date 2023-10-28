import { Component, Input } from '@angular/core';
import { IBeer } from 'src/app/interfaces/IBeer';
import { ShoppingCartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-item-to-cart',
  templateUrl: './add-item-to-cart.component.html',
  styleUrls: ['./add-item-to-cart.component.scss']
})
export class AddItemToCartComponent {
  @Input()
  item!: IBeer;

  private cartService: ShoppingCartService;
  constructor(cartService: ShoppingCartService) {
    this.cartService = cartService;
   }

  async addItemToCart(): Promise<void> {
    alert("Item added");
    this.item.in_cart = true;
    this.item.in_cart_amount = this.item.in_cart_amount! >= 1 ? this.item.in_cart_amount! += 1 : 1;
    await this.cartService.addItem(this.item)
  }
}
