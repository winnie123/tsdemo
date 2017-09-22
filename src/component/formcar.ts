import {CarBiz} from "../biz/car_biz";
import {SearchParamModel, SearchResultModel} from "../model/car_model";
import {FormcarBaseDataModel, FormcarItemDataModel,ForcarActionDataModel, SelectModel} from "../model/formcar-model";
import * as Mock from '../mockdata/mockdata.js';
import * as Util from '../common/util';

export class FormcarComponent {
    public biz: CarBiz;
    public param: SearchParamModel;
    public baseData: FormcarBaseDataModel;
    public itemData: FormcarItemDataModel;
    public actionData: ForcarActionDataModel;

    constructor(biz : CarBiz) {
        this.biz = biz;
        this.param = null;
        this.baseData = null;
        this.itemData = null;
        this.actionData = null;
    }

    public initData(): void {
        this.baseData = this._initBaseData();
        this.itemData = this._initItemData();
        this.actionData = this._initActionData();
    }

    private _initBaseData(): FormcarBaseDataModel {
        let typeAs = Util.getArrayDistinctByAttribute(Mock.carList, 'typeA');
        let typeBs = Util.getArrayDistinctByAttribute(Mock.carList, 'typeB');
        let categorys = Util.getArrayDistinctByAttribute(Mock.carList, 'categroy');
        let types = Util.getArrayDistinctByAttribute(Mock.carList, 'type');
        let carTypes = Util.getArrayDistinctByAttribute(Mock.carList, 'carType');
        let names = Util.getArrayDistinctByAttribute(Mock.carList, 'name');
        let carCitys = Util.getArrayDistinctByAttribute(Mock.carList, 'carCity');

        let baseData = {
            typeAs,
            typeBs,
            categorys,
            company: '',
            types,
            carTypes,
            names,
            carNo: '',
            carCitys,
            param: null
        };
        return baseData;
    }

    public _initItemData(): FormcarItemDataModel {
        let itemData = {
            result: null
        };

        return itemData;
    }

    public _initActionData(): ForcarActionDataModel {
        let actionData = {
            search: () => {
                this.searchCarList();
            }
        };
        return actionData;
    }

    public searchCarList(): void {
        let searchParam = null;
        this.baseData.param = searchParam;
        let result = this.biz.searchData(searchParam);
        this.itemData.result = result;
    }

    public render(): string {
        return `
            <div>
                 <div class="list1">
                    <select class="select1" id="typeAs_select">
                        ${this._renderOptions(this.baseData.typeAs)}
                    </select>
                    <select class="select2" id="types_select">
                        ${this._renderOptions(this.baseData.types)}
                    </select>
                </div>
                <div class="list2">
                    <select class="select1" id="typeBs_select">
                        ${this._renderOptions(this.baseData.typeBs)}
                    </select>
                    <select class="select2" id="carTypes_select">
                        ${this._renderOptions(this.baseData.carTypes)}
                    </select>
                </div>
                <div class="list3">
                    <select class="select1" id="categorys_select">
                        ${this._renderOptions(this.baseData.categorys)}
                    </select>
                    <select class="select2" id="names_select">
                        ${this._renderOptions(this.baseData.names)}
                    </select>
                </div>
                <div class="list4">
                    <div class="firm">
                        <input type="text" name="" id="" value="车牌号码" id="carNo_txt"/>
                    </div>
                    <div class="busNumber">
                        <input type="text" name="" id="" value="生产企业" id="company_txt"/>
                        <select name="" id="carCitys_select>
                            ${this._renderOptions(this.baseData.carCitys)}
                        </select>
                    </div>
                </div>
                <div class="list5">
                    <input type="button" id="search_btn" v-on:click="searchData"/>
                </div>
            </div>`;
    }

    public bindEvent(): void {
        // $('#search_btn').bind('click', this.actionData.search);

        document.querySelector('#search_btn').addEventListener('click',this.actionData.search);
    }

    private _renderOptions(arr: Array<SelectModel>): string {
        let component = ``;
        arr.forEach((item) => {
            component += `<option value="${item.value}">${item.content}</option>`
        });
        return component;
    }
}