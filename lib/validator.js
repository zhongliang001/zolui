let validator = {
    isRequired: function  (obj){
        let _this = obj;
        if(!_this.value){
            _this.msg= _this.field.fieldName +"必输"
            return {
                status: false
            }
        }else {
            return {
                msg: "",
                status: true
            }
        }

    }
}


export default validator