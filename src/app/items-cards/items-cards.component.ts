import { Component, Input, OnInit } from '@angular/core';
import { IItemsStrategy } from './design-patterns/strategies/favourite-items/interfaces/IItemsStrategy';
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
  stock: number = 0;
  
  constructor(private paginationService: PaginationService) {
  }

  async ngOnInit() {
      this.paginationService.setPaginationWrapper();
      this.paginationService.resetPagination()   
      this.items = await this.ItemsStrategy.getItems();
      this.stock = await this.ItemsStrategy.getTotalItems();
      this.showPagination = this.ItemsStrategy.showPagination();
      }
  
  async changePage(){
    this.items = await this.ItemsStrategy.getItems();
    this.stock = await this.ItemsStrategy.getTotalItems();
    this.paginationService.calculateNumberOfPages(this.stock);
  }
}
