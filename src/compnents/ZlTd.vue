<template>
    <td :class="[{hidden: isHidden},'td-' +column,'td-' +column+'-'+ (field.index+1)]">
       <template v-if="field.index%2 === 0">
         <div class="row mb-1">
         <label class="col-form-label row-cols-sm-auto text-end" :hidden="isHidden">{{field.fieldName}}</label>
         </div>
        </template>
        <template v-else>
            <zl-field :field="field" :reqData="reqData"/>
        </template>
    </td>

</template>

<script>
    import ZlField from "./ZlField.vue";
    export default {
        name: "ZlTd",
        props:['field','reqData','column'],
        components:{ZlField},
        data: function () {
            return {
                isHidden: true
            }
        },
        mounted: function() {
            this.isHidden = this.field.hidden
        }

    }
</script>

<style scoped>

</style>
