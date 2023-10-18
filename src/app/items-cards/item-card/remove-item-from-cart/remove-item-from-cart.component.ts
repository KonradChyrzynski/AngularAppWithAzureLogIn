import { Component, Input, OnInit } from '@angular/core';
import { IBeer } from 'src/app/interfaces/IBeer';
import { ShoppingCartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-remove-item-from-cart',
  templateUrl: './remove-item-from-cart.component.html',
  styleUrls: ['./remove-item-from-cart.component.scss']
})
export class RemoveItemFromCartComponent implements OnInit {
  @Input()
  item!: IBeer;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {

  }

  removeItemFromCart(){
    this.shoppingCartService.removeItem(this.item.id)
    this.item.in_cart = false;
    this.item.in_cart_amount = 0;
    document.getElementById(`app-item-${this.item.id}`)?.remove();
  }

}