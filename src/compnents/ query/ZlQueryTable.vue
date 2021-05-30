<template>
    <div>
        <zl-form :ref="re" :column="column" :url="url" :method="method">
            <zl-item v-for="filed in fileds"  :type="filed.type" :field-name="filed.cnName" :name="filed.name" />
        </zl-form>
        <div style="align-content: center; margin:0 auto;width:300px; ">
            <zl-button type="submit"  name="查询" @click.native="onclick"/>
            <zl-button type="reset" name="重置"  @click.native="reset"/>
        </div>
        <slot/>
        <table>
            <tr>
                <th v-for="title in titles"> {{title.cnName}}</th>
            </tr>
            <tr  v-for="(line, index) in data" @click="sel(line,index)" :class="[index === selNum? selected : '']">
                <td v-for="title in titles">{{line[title.name]}}</td>
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
        props:['column','titles','url','re','method','fileds'],
        components: {ZlPagination, ZlItem, ZlButton, ZlForm},
        data: function(){
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
                this.selNum = -1
                this.selData = {}
                this.pageNum = num
                this.onclick()
            },
            sel: function (line, index) {
                this.selNum = index
                this.selData  = line
            },
            reset: function () {
                let _this = this
                let form = this.common.getForm(this,_this._props.re)
                form.reset()
            }
        }
    }
</script>

<style scoped>
    table th {
        width: 200px; min-height: 25px; line-height: 25px; text-align: center; border: 1px solid #000000; background-color: #2C3E50;
    }

    table td {
        width: 200px; min-height: 25px; line-height: 25px; text-align: center; border: 1px solid #000000;
    }

    table {
        border-collapse: collapse;
    }

    .selected{
        background-color: red;
    }
</style>
