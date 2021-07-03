<template>
  <div v-model="field">
        <span :class="field.cstclass" class="form-input" >
            <input :type="field.type" v-model="value" :name="field.name" @input="inputData" :reqData="reqData"
                   :hidden="field.hidden" :readOnly="field.readOnly"/>
        </span>
    <template v-if="field.required === 'true'">
      <span style="color: red; ">*</span>
    </template>
    <span :class="[isActive? error: hidden]">
            {{ msg }}
        </span>
  </div>
</template>

<script>
export default {
  name: "ZlInput",
  props: ['field', 'reqData'],
  data: function () {
    return {
      msg: '',
      isActive: false,
      value: '',
      hidden: 'hidden',
      error: 'error'
    }
  },
  mounted: function () {
    this.value = this.field.defaultValue;
    this.reqData[this.field.name] = this.value
  },
  created: function () {
    this.$watch(
        // 第一个函数就是处理你要监听的属性
        function () {
          return this.reqData
        },
        function (newVal) {
          this.value = newVal[this.field.name]
        }
    )
  },
  methods: {
    inputData: function () {
      if (this.field.dataType === 'Number' || this.field.dataType === 'Currency') {
        if (isNaN(this.value)) {
          this.msg = '请输入数字'
          this.value = ''
          this.isActive = true
          return
        } else {
          this.msg = ''
          this.isActive = false

        }
      }
      this.reqData[this.field.name] = this.value
      if (this.validate) {
        this.validate()
      }
    },
    validate: function () {
      if ((this.field.required === 'true' || this.field.required === 'required') && !this.value) {
        this.msg = this.field.fieldName + '不能为空'
        this.isActive = true
        return false
      } else if ((this.field.required === 'true' || this.field.required === 'required') && this.value) {
        this.msg = ''
        this.isActive = false
        return true
      }
    }
  }
}
</script>
