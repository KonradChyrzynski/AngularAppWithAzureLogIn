import { Injectable } from "@angular/core";
import { IBeer } from "../interfaces/IBeer";
import { BehaviorSubject, Subject } from "rxjs";
import { PaginationService } from "./pagination.service";

@Injectable({
  providedIn: 'root'
})
export class FavouriteItemsService 
{
    public items: Set<IBeer> = new Set(
    );

    private showPaginationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public items$: BehaviorSubject<IBeer[]> = new BehaviorSubject<IBeer[]>(Array.from(this.items))

    constructor(public paginationService: PaginationService){
        
    }

    addToFavourite(item: IBeer): void
    {
        this.items.add(item)
    }

    removeFromFavourite(id: number) {
        for(let item of this.items){
            if(item.id === id){
                this.items.delete(item);
                if(this.paginationService.currentPage === 1){
                    this.items$.next(Array.from(this.items))
                }
                break;
            }
        }

        if(this.items.size === 0){
            this.showPaginationSubject.next(false); 
        }
        else{
            this.showPaginationSubject.next(true); 
        }
    }

    async getFavouriteItems(): Promise<IBeer[]>
    {
        if(this.items.size > 6){
            this.showPaginationSubject.next(true);
        }
        return new Promise<IBeer[]>((resolve) => 
            resolve(Array.from(this.items))
        )
    }

    async getTotalItems(): Promise<number>{
        return new Promise<number>((resolve) => 
        resolve(this.items.size))
    }

    showPaginationFlag(): Subject<boolean> {
        return this.showPaginationSubject;
    }

    changePaginationFlag(flag: boolean): void  {
        this.showPaginationSubject.next(flag);
    }
}

