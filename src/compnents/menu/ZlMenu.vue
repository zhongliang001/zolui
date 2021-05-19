<template>
    <div style="clear: both;">
        <div style="float: left;width: 14%;">
            <div v-for="(item, index) in menu" :key="index">
                <ZlMenuItem :data="item">
                </ZlMenuItem>
            </div>
        </div>
        <div style="border: 1px solid #ebf0f1; float: right; width: 85%; height: 100%;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import ZlMenuItem from "./ZlMenuItem";
    export default {
        name: 'ZlMenu',
        props:['menu'],
        components: {
            ZlMenuItem
        }
    }
</script>
