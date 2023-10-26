import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBeer } from '../interfaces/IBeer';
import { BehaviorSubject } from 'rxjs';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class BeerService {
    length: any;
    constructor(private http: HttpClient) { }
    public items: IBeer[] = []
    public items$: BehaviorSubject<IBeer[]> = new BehaviorSubject<IBeer[]>(Array.from(this.items))
    
    url = 'https://api.punkapi.com/v2/beers';

    async getArrayOfItems(): Promise<void> {
        try {
            const response: any = await this.http.get(this.url).toPromise();
            this.items = response as IBeer[];

            await this.fulfillMissingFields();
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    }

    async getItems(): Promise<IBeer[]> {

        if(this.items.length === 0){
            await this.getArrayOfItems();
        }

        return this.items;
    }

    getTotalItems(): Promise<number> {
        return new Promise<number>((resolve) => {
            resolve(this.items.length);
        })
    }

    async fulfillMissingFields(): Promise<void> {
        const pricePromises: Promise<number>[] = [];

        for (const bear of this.items) {
            bear.in_cart = false;
            bear.in_cart_amount = 0;
            bear.favourite = false;

            const pricePromise: Promise<number> = this.fetchPriceById(bear.id)
                .then(price => bear.price = price);

            pricePromises.push(pricePromise);
        }

        await Promise.all(pricePromises);
    }

    async fetchPriceById(id: number): Promise<number> {
        //simulate db call
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                const staticPrice = 15.0;
                resolve(staticPrice);
            }, 1000); 
        });
    }
}
