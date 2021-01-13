<template>
    <input type="button" @click="click"/>
</template>

<script>
    export default {
        name: "ZlButton",
        props:['type'],
        data: function(){
            return {
                formcomp: {}
            }
        },
        mounted: function(){
            if (this.type === "submit") {
                let children = this.$parent.$children
                for(let x = 0; x < children.length; x ++){
                    if(children[x].$options._componentTag === 'zl-form'){
                        this.formcomp = children[x]
                        return;
                    }
                }
            }
        },
        methods:{
            click : function () {
                if (this.type === "submit") {
                   console.log(this.formcomp)
                }


            }
        }
    }
</script>

<style scoped>

</style>
