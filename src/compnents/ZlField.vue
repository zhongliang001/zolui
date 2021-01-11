<template>
    <div >
        <template v-if="field.type.toLowerCase() === 'select'">
            <zl-select  :field="field" :reqData="reqData"/>
        </template>
        <template v-else-if="field.type.toLowerCase() === 'textarea'">
            <zl-textarea :field="field" :reqData="reqData"/>
        </template>
        <template v-else-if="field.type.toLowerCase() === 'text' || field.type.toLowerCase() === 'password'">
            <zl-input :field="field" :reqData="reqData"/>
        </template>
        <template v-else-if="field.type.toLowerCase() === 'radio'">
            <zl-radio :field="field" :reqData="reqData"/>
        </template>
        <template v-else="field.type.toLowerCase() === 'checkbox'">
            <zl-checkbox  :field="field" :reqData="reqData"/>
        </template>
    </div>
</template>

<script>
    import ZlSelect from "./ZlSelect.vue";
    import ZlInput from "./ZlInput.vue";
    import ZlTextarea from "./ZlTextarea.vue";
    import ZlRadio from "./ZlRadio.vue";
    import ZlCheckbox from "./ZlCheckbox";

    export default {
        name: "ZlField",
        props:['field','reqData'],
        components: {ZlCheckbox, ZlRadio, ZlTextarea, ZlSelect,ZlInput,ZlRadio}


    }
</script>

<style>

</style>
