import {CarListActionDataModel, CarListBaseDataModel, PaginatorModel} from "../model/carlist";
import {FormcarItemDataModel} from "../model/formcar";
import CarBiz from "../biz/car";
import * as Constant from '../common/constant';
import {CarModel, SearchParamModel} from "../model/car";
import * as $ from 'jquery';
import jqPaginator from 'jqpaginator/dist/1.2.0/jqpaginator.min';


export default class CarListComponent {
    public baseData: CarListBaseDataModel;
    public itemData: FormcarItemDataModel;
    public actionData: CarListActionDataModel;
    public biz: CarBiz;


    constructor(biz: CarBiz) {
        this.biz = biz;
        this.baseData = null;
        this.itemData = null;
        this.actionData = null;
    }

    public initData(): void {
        this.baseData = this._initBaseData();
        this.itemData = this._initItemData();
        this.actionData = this._initActionData();
    }

    private _initBaseData(): any {
        let baseData = {
            currentPageIndex: 1,
            pageIndex: this.biz.searchResult.length / Constant.pageSize,
            pageParam: {
                pageInex: 1
            }
        };
        return baseData;
    }

    private _initItemData(): FormcarItemDataModel {
        let itemData = {
            result: {
                carList: this.biz.searchResult,
                totalPages: this.baseData.totalPages,// 页数
                totalCount: this.biz.searchResult.length,
                currentPageIndex: this.baseData.currentPageIndex
            }
        };

        return itemData;
    }

    private _initActionData(): CarListActionDataModel {
        let actionData = {
            search: (pageIndex) => {
                this.biz.searchDataByPage(this.biz.searchResult, pageIndex);
            }
        };
        return actionData;
    }


    public render(): string {
        let component = `
                    <ul class="row ">
						<li class="tabTitle">
							<ul class="col ">
								<li class="col1">序号</li>
								<li class="col2">机具大类</li>
								<li class="col3">机具小类</li>
								<li class="col4">机具品目</li>
								<li class="col5">生产企业</li>
								<li class="col6">产品名称</li>
								<li class="col7">机具型号</li>
								<li class="col8">拟归入分档名称</li>
								<li class="col9">车牌号码</li>
								<li class="col10">车牌城市名称</li>
							</ul>
						</li>
						${this._renderRow(this.biz.showResult)}
					</ul>`;

        return component;
    }

    /**
     * @method 渲染农机列表内容
     * @param {Array<CarModel>} data 农机数据集
     * @returns {string}
     * @private
     */
    private _renderRow(data: Array<CarModel>): string {
        let component = ``;
        data.forEach((item, index) => {
            component += `
                        <li class="tabTitle">
							<ul class="col ">
								<li class="col1">${index + 1 + (this.baseData.currentPageIndex - 1) * Constant.pageSize}</li>
								<li class="col2">${item.typeA}</li>
								<li class="col3">${item.typeB}</li>
								<li class="col4">${item.category}</li>
								<li class="col5">${item.company}</li>
								<li class="col6">${item.type}</li>
								<li class="col7">${item.carType}</li>
								<li class="col8">${item.name}</li>
								<li class="col9">${item.carNo}</li>
								<li class="col10">${item.carCity}</li>
							</ul>
						</li>`;
        });
        return component;
    }

    /**
     * @method 渲染分页控件
     * @param {PaginatorModel} param 控件参数
     * @private
     */
    private _renderPaginator(param: PaginatorModel): void {
        let self = this;
        $('#foot').jqPaginator({
            totalPages: param.totalPages,
            visiblePages: param.visiblePages,
            currentPage: param.currentPage,
            onPageChange: function (num, type) {
                self.itemData.result = self.biz.searchDataByPage(self.biz.searchResult, num);
                $('.section').html('');
                let html = self.render();
                $('.section').html(html);
            }
        });
    }
}