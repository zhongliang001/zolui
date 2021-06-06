<template>
    <div class="branch">
        <p>
            <span v-if="level > 0">
                 <span v-for="index in (level)">
                &nbsp;&nbsp;&nbsp;
                </span>
            </span>
            <span v-if="branch.children && branch.children.length!= 0">
                <a :class="[isClose ? 'close': 'open']" @click="expend">{{branch.name}}</a>
            </span>
            <span v-else>
                <a @click="expend">{{branch.name}}</a>
            </span>
        </p>
        <div :class="[isClose ? 'close': 'open']" v-if="branch.children && branch.children.length!= 0">
            <div v-for="(children, index) in branch.children" :key="index">
                <zl-branch :branch="children" v-bind:level="Number(level) + 1" :sel="sel"/>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'ZlBranch',
        props:{'branch':{
            type: Object
            },'level':{
            type: Number
            },'sel':{
            type: Object
            }
        },
        data: function(){
            return {
                isClose: true
            }
        },
        methods: {
            expend: function(){
                if(this.branch.children.length!= 0){
                    this.isClose  = !this.isClose
                }
                this.sel.data = this.branch
                console.log(this.sel.data)
                console.log(this.branch)
            }
        }
    }
</script>

<style scoped>

</style>
