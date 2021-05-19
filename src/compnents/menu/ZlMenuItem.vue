<template>
    <div class="menu">
        <div  :style="menuStyle" @mouseover="over" @mouseout="out" @click="click">
            <div>
                <template v-if="data.path != null && data.path != ''">
                    <router-link class="dropdown-item"  :to="data.path">{{data.name}}</router-link>
                </template>
                <template v-else>
                    <div class="dropdown-item" >{{data.name}}</div>
                </template>
            </div>
        </div>
        <div :class="{isHidden: active}" v-for="(val, index) in data.children" v-bind:key="index">
            <ZlMenuItem :data="val"></ZlMenuItem>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ZlMenuItem',
        props: {
            data:{
                Object,
                default: ()=>({
                    path: '#'
                })
            }
        },
        data: function() {
            return {
                active: true,
                menuStyle: {
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#66CCCC',
                    textAlign: 'center',
                    lineHeight: '50px',
                    top: '50%',
                    border: '1px solid transparent',
                    clear: 'both'
                }
            }
        },
        mounted:function(){
            var menuStyle = this.$parent.menuStyle
            if(menuStyle){
                var color = menuStyle.backgroundColor
                var startColor =  color.substring(0, 5)
                var endColor = color.substring(4, 6)
                endColor = parseInt(endColor,16)
                endColor = endColor + 20;
                if(endColor < 0){
                    endColor = 0
                }
                endColor = endColor.toString(16).toUpperCase()
                color = startColor + endColor
                this.menuStyle.backgroundColor = color
            }
        },
        methods: {
            over: function() {
                this.menuStyle.border = 'solid 1px grey'
            },
            out: function() {
                this.menuStyle.border = 'solid 1px transparent'
            },
            click: function() {
                if(this.$children){
                    if(this.active){
                        this.active = false
                    }else{
                        this.active = true
                    }
                }
            }
        }
    }
</script>

<style>
    .isHidden {
        display: none;
    }
    .menuItemChoose {
        width: 20%;
        height: 50px;
        text-align: center;
        background-color: #99CCCC;
        line-height: 50px;
        top: 50%;
    }
</style>
