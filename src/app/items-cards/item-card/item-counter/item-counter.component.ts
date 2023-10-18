import { Component, Input } from '@angular/core';
import { IBeer } from 'src/app/interfaces/IBeer';
import { ShoppingCartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-item-counter',
  templateUrl: './item-counter.component.html',
  styleUrls: ['./item-counter.component.scss']
})
export class ItemCounterComponent {
  @Input()
  item!: IBeer;
  constructor(private shoppingCartService: ShoppingCartService){

  }

  increaseAmmount(){
      this.shoppingCartService.totalPrice += this.item.price as number;
      this.item.in_cart_amount = this.item.in_cart_amount as number + 1;
  }

  decreaseAmmount(){
    if(this.item.in_cart_amount as number !== 1){
      this.item.in_cart_amount = this.item.in_cart_amount as number - 1;
      this.shoppingCartService.totalPrice -= this.item.price as number;
    }
  }
}
