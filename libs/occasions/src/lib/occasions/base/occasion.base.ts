import { Observable } from "rxjs";
import { occasionRes } from "../interface/occasions.interface";

export abstract class OccasionBase {
  abstract getAllOccasions(): Observable<occasionRes>;
}
