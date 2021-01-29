<template>
    <div>
        <div>
            <ul>
                <li><router-link :to="{ name: 'Hi' }">home</router-link></li>
                <li><router-link :to="{ name: 'Hi2' }">foo</router-link></li>
            </ul>
        </div>
        <router-view></router-view>
    </div>

</template>

<script>
    export default {
        name: "ZlMenu"
    }
</script>

<style scoped>

</style>
