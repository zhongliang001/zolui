<template>
    <div :class="[viewPage !== page? hidden : '']">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "ZlPage",
        props: ['viewPage','page'],
        data: function () {
            return {
                hidden: 'hidden'
            }
        }
    }
</script>

<style scoped>

</style>
