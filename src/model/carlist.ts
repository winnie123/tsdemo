import {PageParamModel} from "./car";

export interface CarListBaseDataModel {
    currentPageIndex : number,
    totalPages : number,
    pageParam : PageParamModel
}

export interface CarListActionDataModel {
    search : (pageIndex : number)=>void
}

export interface PaginatorModel{
    totalPages : number,
    visiblePages : number,
    currentPage:number,
    onPageChange : (num,type)=>{}
}