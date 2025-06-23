import { createReducer, on } from "@ngrx/store";
import { sortConditions, sortProducts, sortState } from "./sort.states";
import * as sortActions from "./sort.actions"
export enum sortTypes {
  ASC = "asc",
  DESC = "desc"
}
const sortInitialState:sortState = {
  products:[],
  sortedProducts:[],
  sortedConditions:{} as sortConditions,

}

export const sortReducer = createReducer(
  sortInitialState,
  on(sortActions.loadProducts , ()=>sortInitialState),
  on(sortActions.setProducts , (state,{products})=>{
    return {
      ...state,
      products:products,
      sortedProducts:products,
    }
  }),

  on(sortActions.sortByTitle , (state , {sType} ) => {
      return {
        ...state,
        sortedConditions: {
          type: sType,
          sortBy:"title",
        }

      }
  } ),
  on(sortActions.sortByPrice , (state , {sType} ) => {
      return {
        ...state,
        sortedConditions: {
          type: sType,
          sortBy:"price"
        }

      }
  } ),
  on(sortActions.sortProducts , (state)=>{
    const newState = {
      ...state,
    }
    const sortType = state.sortedConditions.type
    const sortField = state.sortedConditions.sortBy



   switch(sortType) {
    case sortTypes.ASC:
      if(sortField === "title") {
        newState.sortedProducts = sortProducts(newState.products , "title","asc")
      }else {
        newState.sortedProducts = sortProducts(newState.products , "price","asc")
      }

      break;
    case sortTypes.DESC:
      if(sortField === "title") {
        newState.sortedProducts = sortProducts(newState.products , "title","desc")
      }else {
        newState.sortedProducts = sortProducts(newState.products , "price","desc")
      }

   }

   return newState;
  })

)
