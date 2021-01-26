<template>
    <div id="test" class="form-date" @click="isShow= false">
        <div @click.stop="isShow= true">
            <input type="text" v-model="value" :name="field.name" :reqData="reqData" :hidden="field.hidden" />
            <div class="form-date-sel-table" v-show="isShow" >
                <div class="sel">
                    <zl-button type="button" name="<<" @click.native="reduceYear" />
                    <zl-button type="button" name="<" @click.native="reduceMon" />
                    <div>
                        <select v-model="mon" @change="createDates">
                            <option v-for="mon in getNum(0,12)" :value="mon">{{mon +1 }}月</option>
                        </select>
                    </div>
                    <div>
                        <select v-model="year" @change="createDates">
                            <option v-for="n in getNum(1900,2100)" :value="n">{{n}}年</option>
                        </select>
                    </div>
                    <zl-button type="button" name=">" @click.native="addMon"/>
                    <zl-button type="button" name=">>" @click.native="addYear"/>
                </div>
                <table>
                    <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                    <tr v-for="week in days">
                        <td v-for="{dNum, dStr} in week" :data-value="dStr" @click="choose">{{dNum}}</td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
    import ZlButton from "./ZlButton";
    export default {
        name: "ZlDate",
        components: {ZlButton},
        props: ['field', 'reqData'],
        data: function () {
            return {
                value:'',
                mon:'',
                year: '',
                days:[],
                isShow: false
            }
        },
        mounted() {
            let now = new Date();
            this.mon = now.getMonth()
            this.year = now.getFullYear()
            this.createDates()
            let _this = this
            document.onclick = function () {
                _this.isShow = false
            }
        },
        methods:{
            getNum:function (start, stop) {
                return new Array(stop-start).fill(start).map((n,i)=>n+i);
            },
            addYear: function () {
                if(this.year === ''){
                    this.year = 1900
                    return
                }
                if(this.year < 2100){
                    this.year ++
                }
                this.createDates()
            },
            reduceYear: function () {
                if(this.year === ''){
                    this.year = 1900
                    return
                }
                if(this.year > 1900){
                    this.year --
                }
                this.createDates()
            },
            addMon: function () {
                if(this.mon === ''){
                    this.mon = 1
                    return
                }
                if(this.mon < 11){
                    this.mon ++
                }
                this.createDates()
            },
            reduceMon: function () {
                if(this.mon === ''){
                    this.mon = 1
                    return
                }
                if(this.mon > 0){
                    this.mon --
                }
                this.createDates()
            },
            createDates: function () {
                // 当月第一天的星期
                let date = new Date(this.year, this.mon, 1)
                let day = date.getDay()
                // 上月最后一天日期
                let minusDate=1000*60*60*24
                let lastMonthStop =  new Date(date.getTime()-minusDate)
                let lastMon = lastMonthStop.getMonth()
                let lastYear = lastMonthStop.getFullYear()
                let lastStopDay = lastMonthStop.getDate()
                // 本月最后一天
                let nextStDate = new Date(this.year, this.mon + 1 , 1)
                let nextMon = nextStDate.getMonth()
                let nextYear = nextStDate.getFullYear()
                let stop =  new Date(nextStDate.getTime()-minusDate)
                let stopDay = stop.getDate()
                let d = []
                // 展示上个月天数
                for(let i = 0; i < day; i ++){
                    let dNum = lastStopDay - day + i + 1
                    let dStr = new Date(lastYear,(lastMon),dNum).format('yyyy-MM-dd')
                    d[i] = {dNum, dStr}
                }
                for(let i = 0; i < stopDay; i ++){
                    let dNum =  i + 1
                    let dStr = new Date(this.year ,this.mon,dNum).format('yyyy-MM-dd')
                   d[day + i] ={dNum, dStr}
                }

                for(let i = 0; i < 42-day-stopDay; i ++){
                    let dNum =  i + 1
                    let dStr =  new Date(nextYear , nextMon ,dNum).format('yyyy-MM-dd')
                    d[day + stopDay + i] = {dNum, dStr}
                }
                let j = 0
                for(let i = 0; i < 6; i++){
                    let w = []
                    for(let n= 0; n < 7; n ++){
                        w[n] = d[j]
                        j++
                    }
                    this.days[i] = w
                }
            },
            choose: function (e) {
               this.value =  e.target.getAttribute("data-value")
            }
        }
    }
</script>

<style scoped>

</style>
