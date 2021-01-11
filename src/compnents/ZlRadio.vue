<template>
    <div>
        <template v-for="(cname, ename) in options">
            {{cname}}:<input :type="field.type"   :value="ename" :name="field.name"  v-model="value" @change="change">
        </template>
        <div :class="{error:isActive}">
            {{msg}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ZlRadio",
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
            this.options =  this.dictData[this.field.dictName]
            this.reqData[this.field.name] = this.value
            this.$forceUpdate()
            this.value = ''
        },
        methods: {
            change: function () {
                this.reqData[this.field.name] = this.value
            }
        },
        validate: function () {
            if((this.field.required === 'true' || this.field.required === 'required')&& !this.reqData[this.field.name]){
                this.msg = this.field.fieldName + '不能为空'
                this.isActive = true
                return false
            }
        }
    }
</script>
