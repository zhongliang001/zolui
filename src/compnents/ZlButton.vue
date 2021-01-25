<template>
    <div>
        <input type="button"  @click="click" :value="name"/>
    </div>
</template>

<script>
    export default {
        name: "ZlButton",
        props:['type','name'],
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
                    // this.$set(this.formcomp.reqData, 'username','1')

                }else if(this.type === 'reset'){
                    this.formcomp.reset()
                }


            }
        }
    }
</script>

<style scoped>

</style>
