import FormarComponent from './component/formcar';
import CarListComponent from './component/carlist';
import CarBiz from './biz/car';
import * as $ from 'jquery';
// require('../res/css/list.css');
// require('../res/css/page.css');

// let setupEvn = ()=>{
//     const jsdom = require("jsdom");
//     const { JSDOM } = jsdom;
//     const { window } = new JSDOM(`...`);
//     var $ = require('jquery')(window);
// };

let appStart = ()=>{
    console.log('appStart start');

    let biz = new CarBiz();
    let carListComponent = new CarListComponent(biz);
    carListComponent.initData();

    let formCarComponent = new FormarComponent(biz,carListComponent);
    formCarComponent.initData();
    $('.selectbox').html(formCarComponent.render());
    formCarComponent.bindEvent();

    $('.section').html(carListComponent.render());
    console.log('appStart end');
};

appStart();