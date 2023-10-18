import { Injectable } from '@angular/core';
import { IBeer } from '../interfaces/IBeer';

@Injectable({
    providedIn: 'root'
  })
export class ShoppingCartService{
    
    items: Set<IBeer> = new Set<IBeer>(); 
    public totalPrice: number = 0;

    constructor() {
        
    }

    async addItem(item: IBeer): Promise<void>
    {
        this.items.add(item);
        this.totalPrice += item.price as number;
    }

    async removeItem(itemId: number): Promise<void>
    {
        for(let item of this.items){
            if(item.id === itemId){
                this.items.delete(item);
                const ammount: number = item.in_cart_amount as number;
                this.totalPrice -= item.price as number * ammount;
                break;
            }
        }
    }

    async getItems(): Promise<IBeer[]>{
        return new Promise<IBeer[]>((resolve) =>resolve(
            Array.from(this.items)
            ));
    }

}