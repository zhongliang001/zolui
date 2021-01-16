<template>
    <div>
        <select :name="field.name"  @change="change" v-model="value">
            <option v-for="opt in options" :value="opt.enName">{{opt.cnName}}</option>
        </select>
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
            },
            validate: function () {
                if((this.field.required === 'true' || this.field.required === 'required')&& !this.value){
                    this.msg = this.field.fieldName + '不能为空'
                    this.isActive = true
                    return false
                }
            }
        }

    }
</script>
