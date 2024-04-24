import { Injectable } from '@angular/core';
import { LazyLoadEvent } from "primeng/api";
import { Pagination } from '../models/pagination';

export const totalCountHeader = "X-Total-Count";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  // extractPage(event: LazyLoadEvent): Pagination {
  //   let page = 0, size = 10;
  //   if (event) {
  //     size = event.rows;
  //     page = (event.first / size);
  //   }
  //   return { page: page.toString(), size: size.toString() };
  // }

}