import ZlItem from "./src/compnents/ZlItem";
import ZlField from "./src/compnents/ZlField";
import ZlForm from "./src/compnents/ZlForm";
import ZlFTable from "./src/compnents/ZlFTable";
import ZlInput from "./src/compnents/ZlInput";
import ZlSelect from "./src/compnents/ZlSelect";
import ZlTd from "./src/compnents/ZlTd";
import ZlTextarea from "./src/compnents/ZlTextarea";
import ZlRadio from "./src/compnents/ZlRadio";
import ZlCheckbox from "./src/compnents/ZlCheckbox";
import ZlDate from "./src/compnents/ZlDate";
import './src/css/base.css'
import ZlButton from "./src/compnents/ZlButton";
import zlaxios from "./lib/zlaxios";
import common from "./lib/common";
import './lib/DateUtil'
import ZlMenu from "./src/compnents/menu/ZlMenu";
import ZlMenuItem from "./src/compnents/menu/ZlMenuItem";
import ZlQueryTable from "./src/compnents/ query/ZlQueryTable";
import ZlPagination from "./src/compnents/ query/ZlPagination";
import ZlTree from "./src/compnents/tree/ZlTree";
import ZlBranch from "./src/compnents/tree/ZlBranch";
import ZlPage from "./src/compnents/ZlPage";

const components = [
    ZlItem,
    ZlField,
    ZlForm,
    ZlFTable,
    ZlInput,
    ZlSelect,
    ZlTd,
    ZlTextarea,
    ZlRadio,
    ZlCheckbox,
    ZlButton,
    ZlDate,
    ZlMenu,
    ZlMenuItem,
    ZlQueryTable,
    ZlPagination,
    ZlTree,
    ZlBranch,
    ZlPage
]

const install = function(Vue) {

    components.forEach(component => {
        Vue.component(component.name, component);
    });

    if(typeof(Vue)=="function"){
        Vue.prototype.common=common
        Vue.prototype.zlaxios = zlaxios
    }
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ZlItem,
    ZlField,
    ZlForm,
    ZlFTable,
    ZlInput,
    ZlSelect,
    ZlTd,
    ZlTextarea,
    ZlRadio,
    ZlCheckbox,
    ZlButton,
    ZlDate,
    ZlMenu,
    ZlMenuItem,
    ZlQueryTable,
    ZlPagination,
    ZlTree,
    ZlBranch,
    ZlPage
}
