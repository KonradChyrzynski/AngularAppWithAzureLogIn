import { Component, Input, OnInit } from '@angular/core';
import { IItemsStrategy } from './design-patterns/strategies/interfaces/IItemsStrategy';
import { IBeer } from '../interfaces/IBeer';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-items-cards',
  templateUrl: './items-cards.component.html',
  styleUrls: ['./items-cards.component.scss']
})
export class ItemsCardsComponent implements OnInit {

  @Input()
  ItemsStrategy!: IItemsStrategy;
  showPagination!: boolean; 
  items: IBeer[] = [];
  stock!: number;

  constructor(private paginationService: PaginationService) {
  }

  async ngOnInit() {
      this.resetPaginations()   
      this.items = await this.ItemsStrategy.getItems();
      this.stock = this.ItemsStrategy.getTotalItems();
      this.showPagination = this.ItemsStrategy.showPagination();
      console.log('Stock in ItemsCardsComponent:', this.stock);    
      }
  
  async changePage(){
    this.items = await this.ItemsStrategy.getItems();
  }

  resetPaginations(){
    this.paginationService.beersIndexStart = 0;
    this.paginationService.beersIndexEnd = 6;
  }
}
