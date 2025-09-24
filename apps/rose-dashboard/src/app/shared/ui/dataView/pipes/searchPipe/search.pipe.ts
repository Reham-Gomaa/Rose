import { Pipe, PipeTransform } from "@angular/core";
import { itemsType, itemType } from "../paginationPipe/pagPipe.pipe";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(items: itemsType, keyword: string): itemsType {
    let filteredItems: itemsType = items.filter((item: itemType) => {
      return item["slug"].toLowerCase().includes(keyword.toLowerCase());
    });
    return filteredItems;
  }
}
