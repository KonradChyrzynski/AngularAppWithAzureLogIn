import { Injectable } from "@angular/core";
import { IBeer } from "../interfaces/IBeer";

@Injectable({
  providedIn: 'root'
})
export class FavouriteItemsService 
{
    items: Set<IBeer> = new Set(
    );

    constructor(){}

    addToFavourite(item: IBeer): void
    {
        this.items.add(item)
    }

    removeFromFavourite(id: number) {
        for(let item of this.items){
            if(item.id === id){
                this.items.delete(item);
                break;
            }
        }
    }

    getFavouriteItems(): Promise<IBeer[]>
    {
        return new Promise<IBeer[]>((resolve) => 
            resolve(Array.from(this.items))
        )
    }
}

