import { Category } from "@angular-monorepo/categories";
import { occasion } from "@angular-monorepo/occasions";
import { Product } from "@angular-monorepo/products";
import { Pipe, PipeTransform } from "@angular/core";
export type itemsType = (occasion | Category | Product)[];
export type itemType = occasion | Category | Product;
@Pipe({
  name: "pagPipe",
})
export class PagPipePipe implements PipeTransform {
  transform(items: itemsType, startIndex: number, numOfRows: number): itemsType {
    let pageItems = items.slice(startIndex, startIndex + numOfRows + 1);
    return pageItems;
  }
}
