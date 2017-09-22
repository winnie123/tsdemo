import {PageParamModel} from "./car";

export interface CarListBaseDataModel {
    pageIndex : number,
    pageCount : number,
    pageParam : PageParamModel
}

export interface CarListActionDataModel {
    search : ()=>void
}