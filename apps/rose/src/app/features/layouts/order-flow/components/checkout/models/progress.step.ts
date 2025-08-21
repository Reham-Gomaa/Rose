import { Type } from "@angular/core";

export interface progressStep {
  value:number,
  label:string,
  component:Type<any>
}
