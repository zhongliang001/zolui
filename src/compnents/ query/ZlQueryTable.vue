<template>
  <div>
    <zl-form :isShow="isShow" ref="qTable" :column="column" :url="url" :method="method">
      <zl-item v-for="filed in fileds" :key="filed.fieldName" :type="filed.type" :field-name="filed.cnName" :name="filed.name"/>
    </zl-form>
    <div :class="[isShow? '' : 'hidden']"  class="d-grid gap-2 d-md-flex justify-content-md-center" style="align-content: center; margin:0 auto;width:100%; ">
      <zl-button type="submit" name="查询" @click.native="query(true)"/>
      <zl-button type="reset" name="重置" @click.native="reset"/>
    </div>
    <slot/>
    <table class="table table-allbordered">
      <tr>
        <th v-for="title in titles"> {{ title.cnName }}</th>
      </tr>
      <tr v-for="(line, index) in data" @click="sel(line,index)" :class="[index === selNum? selected : '']">
        <td v-for="title in titles">{{ line[title.name] }}</td>
      </tr>
    </table>
    <zl-pagination :total="total" :page-num="pageNum" :page-size="pageSize" @changePage="changePage"/>
  </div>

</template>

<script>

import ZlForm from "../ZlForm";
import ZlButton from "../ZlButton";
import ZlItem from "../ZlItem";
import ZlPagination from "./ZlPagination";

export default {
  name: "ZlQueryTable",
  props: {
    'column': {
      type: Number,
      default: 1
    }, 'titles': {
      type: Array
    }, 'url': {
      type: String
    }, 'method': {
      type: String
    }, 'fileds': {
      type: Array
    }, 'isShow': {
      type: Boolean,
      default: true
    }
  },
  components: {ZlPagination, ZlItem, ZlButton, ZlForm},
  data: function () {
    return {
      data: [],
      pageNum: 1,
      pageSize: 5,
      selNum: -1,
      selData: {},
      selected: 'selected',
      total: 0
    }
  },
  methods: {
    query: function (flag) {
      let _this = this
      if (flag) {
        _this.pageNum = 1
      }
      let form = _this.common.getComponent(this, "qTable")
      let reqData = form.reqData
      this.zlaxios.request({
        url: _this.url,
        method: _this.method,
        data: {
          condition: reqData,
          pageSize: _this.pageSize,
          pageNum: _this.pageNum
        },
        success: function (response) {
          _this.data = response.data
          _this.pageNum = response.pageNum
          _this.pageSize = response.pageSize
          _this.total = response.total
          _this.selData ={}
          _this.selNum = -1

          // _this.$router.push({name:"Welcome"})
        },
        error: function (error) {
          console.log(error)
        }
      })
    },
    changePage: function (num) {
      this.selNum = -1
      this.selData = {}
      this.pageNum = num
      this.query()
    },
    sel: function (line, index) {
      debugger
      this.selNum = index
      this.selData = line
    },
    reset: function () {
      let form = this.common.getComponent(this, 'qTable')
      form.reset()
    },
    setReqData: function (data){
      let form = this.common.getComponent(this, 'qTable')
      form.reqData = data
    }
  }
}
</script>

<style scoped>

</style>
