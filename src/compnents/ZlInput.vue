<template>
    <div>
        <input  :type="field.type" v-model="value" :name="field.name" @input="inputData" :reqData="reqData" :hidden="field.hidden">
        <template v-if="field.required === 'true'">
           <span style="color: red; ">*</span>
        </template>
        <span :class="{error:isActive}">
            {{msg}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "ZlInput",
        props:['field', 'reqData'],
        data: function () {
            return {
                msg: '',
                isActive: true,
                value:''
            }
        },
        mounted: function() {
            this.value = this.field.defaultValue;
            this.reqData[this.field.name] = this.value
        },
        watch:{
            reqData: {
                handler: (data) => {
                    this.reqData = data
                    this.value = data[this.field.name]
                },
                deep: true
            }
        },
        methods:{
            inputData: function () {
                if(this.field.dataType === 'Number' || this.field.dataType === 'Currency'){
                    if(isNaN(this.value)){
                        this.msg = '请输入数字'
                        this.value = ''
                        this.isActive = true
                        return
                    }else {
                        this.msg = ''
                        this.isActive = false

                    }
                }
                this.reqData[this.field.name] = this.value
                if(this.validate){
                    this.validate()
                }
            },
            validate: function () {
                if((this.field.required === 'true' || this.field.required === 'required')&& !this.value){
                    this.msg = this.field.fieldName + '不能为空'
                    this.isActive = true
                    return false
                }else if((this.field.required === 'true' || this.field.required === 'required')&& this.value){
                    this.msg = ''
                    this.isActive = false
                    return true
                }
            }
        }
    }
</script>
