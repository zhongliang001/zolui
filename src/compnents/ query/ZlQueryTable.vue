<template>
    <div>
        <zl-form :ref="re" :column="column" :url="url" :method="method">
            <zl-item v-for="filed in fileds"  :type="filed.type" :field-name="filed.cnName" :name="filed.name" />
        </zl-form>
        <div style="align-content: center; margin:0 auto;width:300px; ">
            <zl-button type="submit"  name="查询" @click.native="onclick"/>
            <zl-button type="reset" name="重置"/>
        </div>
        <slot/>
        <table>
            <tr>
                <td v-for="title in titles"> {{title}}</td>
            </tr>
            <tr v-for="line in data">
                <td v-for="text in line">{{text}}</td>
            </tr>
        </table>
        <zl-page :total="total" :page-num="pageNum" :page-size="pageSize" @changePage="changePage"></zl-page>
    </div>

</template>

<script>

    import ZlForm from "../ZlForm";
    import ZlButton from "../ZlButton";
    import ZlItem from "../ZlItem";
    import ZlPage from "./ZlPage";
    export default {
        name: "ZlQueryTable",
        props:['column','titles','url','re','method','fileds'],
        components: {ZlPage, ZlItem, ZlButton, ZlForm},
        data: function(){
          return {
              data: [],
              pageNum: 1,
              pageSize: 5
          }
        },
        methods:{
            onclick: function () {
                let _this = this
                let form = _this.common.getForm(this,_this._props.re)
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
                       // _this.$router.push({name:"Welcome"})
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            changePage: function(num){
                this.pageNum = num
                this.onclick()
            },
        }
    }
</script>

<style scoped>

</style>
