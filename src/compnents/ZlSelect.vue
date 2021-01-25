<template>
    <div>
        <select :name="field.name"  @change="change" v-model="value">
            <option v-for="opt in options" :value="opt.enName">{{opt.cnName}}</option>
        </select>
        <template v-if="field.required === 'true'">
            <span style="color: red; ">*</span>
        </template>
        <div :class="{error:isActive}">
            {{msg}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ZlSelect",
        props:['field','reqData'],
        data: function () {
            return {
                options:{},
                value:'',
                msg: '',
                isActive: true
            }
        },
        mounted: function () {
            let opts = []
            opts[0] = {
                cnName : '请选择一个选项',
                enName : ''
            }
            this.options = opts.concat(this.dictData[this.field.dictName])
            this.reqData[this.field.name] = this.value
            this.$forceUpdate()
            this.value = ''
        },
        methods:{
            change: function () {
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
                }else{
                    this.msg = ''
                    this.isActive = false
                    return true
                }
            }
        }

    }
</script>
