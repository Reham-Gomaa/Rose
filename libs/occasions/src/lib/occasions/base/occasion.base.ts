import { Observable } from "rxjs";
import { DeleteOccasionRes, OccasionRequest, occasionRes, SingleOccasionRes } from "../interface/occasions.interface";

export abstract class OccasionBase {
  abstract getAllOccasions(): Observable<occasionRes>;
  abstract  getOccasionById(occasionId: string): Observable<SingleOccasionRes>;
  abstract addOccasion(occasionData:FormData): Observable<SingleOccasionRes> 
  abstract updateOccasion(occasionId: string, occasionData:FormData): Observable<SingleOccasionRes>;
  abstract   deleteOccasion(occasionId: string): Observable<DeleteOccasionRes> 

}
