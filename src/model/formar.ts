import {SearchParamModel, SearchResultModel} from "./car";

export interface FormcarBaseDataModel {
    typeAs: Array<SelectModel>;// 机具大类
    typeBs: Array<SelectModel>;// 机具小类
    categorys: Array<SelectModel>;// 机具品目
    company: string;// 生产企业
    types: Array<SelectModel>;// 产品名称
    carTypes: Array<SelectModel>;// 机具型号
    names: Array<SelectModel>;// 拟归入分档名称
    carNo: string,// 车牌号码
    carCitys: Array<SelectModel>;// 车牌城市名称
    param : SearchParamModel;
}

export interface FormcarItemDataModel{
    result : SearchResultModel
}

export interface ForcarActionDataModel{
    search : ()=>void
}

export interface SelectModel{
    value : string,
    content : string
}

