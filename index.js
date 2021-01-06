//var a = require( './lib/test.js' );
import ZlItem from "./src/compnents/ZlItem"
import ZlField from "./src/compnents/ZlField";
import ZlForm from "./src/compnents/ZlForm";
import ZlFTable from "./src/compnents/ZlFTable";
import ZlInput from "./src/compnents/ZlInput";
import ZlSelect from "./src/compnents/ZlSelect";
import ZlTd from "./src/compnents/ZlTd";
import ZlTextarea from "./src/compnents/ZlTextarea";
const components = [
    ZlItem,
    ZlField,
    ZlForm,
    ZlFTable,
    ZlInput,
    ZlSelect,
    ZlTd,
    ZlTextarea
]

const install = function(Vue) {

    components.forEach(component => {
        Vue.component(component.name, component);
    });
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
    ZlTextarea
}
