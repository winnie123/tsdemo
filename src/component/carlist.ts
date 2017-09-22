import {CarListActionDataModel, CarListBaseDataModel} from "../model/carlist-model";
import {FormcarItemDataModel} from "../model/formcar-model";
import {CarBiz} from "../biz/car_biz";
import * as Constant from '../common/constant';
import {CarModel, SearchParamModel} from "../model/car_model";


export class CarListComponent {
    private searchParam: SearchParamModel;
    public baseData: CarListBaseDataModel;
    public itemData: FormcarItemDataModel;
    public actionData: CarListActionDataModel;
    public biz: CarBiz;


    constructor(biz: CarBiz, searchParam: SearchParamModel) {
        this.biz = biz;
        this.searchParam = searchParam;
        this.baseData = null;
        this.itemData = null;
        this.actionData = null;
    }

    private _initBaseData(): any {
        let baseData = {
            pageIndex: 1,
            pageCount: this.biz.searchResult.length / Constant.pageSize,
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
                pageCount: this.baseData.pageCount,// 页数
                totalCount: this.biz.searchResult.length,
                pageIndex: this.baseData.pageIndex
            }
        };

        return itemData;
    }

    private _actionData(): CarListActionDataModel {
        let actionData = {
            search: () => {
                this.biz.searchDataByPage(this.biz.searchResult, this.baseData.pageParam);
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
						${this._renderRow(this.itemData.result.carList)}
					</ul>`;

        return component;
    }

    private _renderRow(data: Array<CarModel>): string {
        let component = ``;
        data.forEach((item, index) => {
            component += `
                        <li class="tabTitle">
							<ul class="col ">
								<li class="col1">${index + this.baseData.pageIndex * Constant.pageSize}</li>
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

    public bindEvent(): void {

    }
}