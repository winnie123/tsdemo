import FormarComponent from './component/formcar';
import CarListComponent from './component/carlist';
import CarBiz from './biz/car';

// let setupEvn = ()=>{
//     const jsdom = require("jsdom");
//     const { JSDOM } = jsdom;
//     const { window } = new JSDOM(`...`);
//     var $ = require('jquery')(window);
// };

let appStart = ()=>{
    console.log('appStart start');

    let biz = new CarBiz();
    let formCarComponent = new FormarComponent(biz);
    formCarComponent.render();
    formCarComponent.bindEvent();

    let carListComponent = new CarListComponent(biz);
    carListComponent.render();

    console.log('appStart end');
};

appStart();