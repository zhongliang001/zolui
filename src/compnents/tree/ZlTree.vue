<template>
    <div class="tree">
        <zl-branch :branch="tree" v-bind:level="0" :sel="sel"/>
    </div>
</template>

<script>
    import ZlBranch from "./ZlBranch";
    export default {
        name: "ZlTree",
        props:['tree','sel'],
        components:['ZlBranch']
    }
</script>

<style scoped>

</style>
