import { Component, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { IBeer } from 'src/app/interfaces/IBeer';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input()
  item!: IBeer;

  public state: boolean = true;
  public route: string = ''

  constructor(router: Router) {
    this.route = router.url
  }

  getImagePosition(): string{
    let imgClass:string = ''

    switch(this.route)
    {
      case '/shopping-cart':
        imgClass = 'img-cart'; 
        break;
      default:
        imgClass = 'img-basic';
    }

    return imgClass;
  }

  cartRoute(): boolean {
    switch(this.route){
      case '/shopping-cart':
        return true;
      default:
        return false;
    }
  }

  calculateItemPrice(): number {

    if(this.item.in_cart_amount !== 0 && this.cartRoute())
    {
      const ammount = this.item.in_cart_amount as number;
      return this.item.price as number *  ammount;
    }

    return this.item.price as number;
  }

}