import CarBiz from "../biz/car";
import {SearchParamModel, SearchResultModel} from "../model/car";
import {FormcarBaseDataModel, FormcarItemDataModel, ForcarActionDataModel, SelectModel} from "../model/formcar";
import * as Mock from '../mockdata/mockdata.js';
import * as Util from '../common/util';
import * as $ from 'jquery';
import CarListComponent from './carlist';

export default class FormcarComponent {
    public biz: CarBiz;
    public param: SearchParamModel;
    public baseData: FormcarBaseDataModel;
    public itemData: FormcarItemDataModel;
    public actionData: ForcarActionDataModel;
    private tableComponent: CarListComponent;

    constructor(biz: CarBiz, tableComponent: CarListComponent) {
        this.biz = biz;
        this.param = null;
        this.baseData = null;
        this.itemData = null;
        this.actionData = null;
        this.tableComponent = tableComponent;
    }

    public initData(): void {
        this.baseData = this._initBaseData();
        this.itemData = this._initItemData();
        this.actionData = this._initActionData();
    }

    private _initBaseData(): FormcarBaseDataModel {
        let typeAs = this._initSelections<SelectModel>({value: '', content: '机具大类'}, 'typeA');
        let typeBs = this._initSelections<SelectModel>({value: '', content: '机具小类'}, 'typeB');
        let categorys = this._initSelections<SelectModel>({value: '', content: '机具品目'}, 'categroy');
        let types = this._initSelections<SelectModel>({value: '', content: '产品名称'}, 'type');
        let carTypes = this._initSelections<SelectModel>({value: '', content: '机具型号'}, 'carType');
        let names = this._initSelections<SelectModel>({value: '', content: '拟归入分档名称'}, 'name');
        let carCitys = this._initSelections<SelectModel>({value: '', content: '车牌城市名称'}, 'carCity');

        let baseData = {
            typeAs,
            typeBs,
            categorys,
            company: '',
            types,
            carTypes,
            names,
            carNo: '',
            carCitys
        };
        return baseData;
    }

    _initSelections<T>(defaultOption: object, attribute: string): Array<T> {
        let result = [];
        result.push(defaultOption);
        result = result.concat(Util.getArrayDistinctByAttribute(Mock.carList, attribute));
        return result;
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
                let searchParam = {
                    typeA: $('#typeAs_select').val(),// 比较大类
                    typeB: $('#typeBs_select').val(),// 比较小类
                    category: $('#categorys_select').val(),// 比较品目
                    carNo: $('#carNo_txt').val(),// 比较车牌号码
                    carType: $('#carTypes_select').val(),// 比较机具型号
                    type: $('#types_select').val(),// 比较器具类型
                    name: $('#names_select').val(),// 比较产品名称
                    company: $('#company_txt').val(),// 比较企业
                    carCity: $('#carCitys_select').val()// 比较所在地
                };
                this.itemData.result = this.searchCarList(searchParam);
                $('.section').html('');
                $('.section').html(this.tableComponent.render());
            }
        };
        return actionData;
    }


    /**
     * @method 渲染下拉列表
     * @param {Array<SelectModel>} source 下拉列表数据源
     * @returns {string}
     * @private
     */
    private _renderOptions(source: Array<SelectModel>): string {
        let component = ``;
        source.forEach((item) => {
            component += `<option value="${item.value}">${item.content}</option>`
        });
        return component;
    }

    public render(): string {
        return `
            <form action="#">
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
                    <input type="button" id="search_btn"/>
                </div>
            </div>
            </form>`;
    }

    public bindEvent(): void {
        $('#search_btn').bind('click', this.actionData.search);

    }

    /**
     * @method 查询农机列表
     * @param {SearchParamModel} searchParam 查询参数
     * @returns {SearchResultModel} 查询结果
     */
    public searchCarList(searchParam: SearchParamModel): SearchResultModel {
        this.biz.searchParam = searchParam;
        let result = this.biz.searchData(searchParam);
        return result;
    }
}