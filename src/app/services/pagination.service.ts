import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PaginationService {
    public beersIndexStart: number = 0;
    public beersIndexEnd: number = 6;
}