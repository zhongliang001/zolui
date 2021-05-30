<template>
	<div>
		<input type="button" value="首页" @click="toFirst">
		<input type="button" value="上一页" @click="toBack">
		<input :class="[num == pageNum? selected : '']" type="button" v-for="num in showNum" :key="num" :value="num" @click="query(num)"/>
		<input type="button" value="下一页" @click="toForward">
		<input type="button" value="尾页"  @click="toLast">
		<input type="button" value="共">
		<input type="text" :value="totalPage" readonly="readonly"/>
		<input type="button" value="页" />
		<input type="button" value="前往">
		<input type="text" :value="pageNum" hidden="true"/>
		<input type="text" v-model="page" @blur="toPage" />
		<input type="button" value="页" />
	</div>
</template>

<script>
export default{
	name: 'ZlPagination',
	props:['total','pageNum','pageSize'],
	data: function(){
		return {
			showNum: [],
			selected: 'selected',
			totalPage: 0,
			page: 0
		}
	},
	watch:{
		total: function(){
			this.formatPageInfo()
		},
		pageNum:  function(){
			this.formatPageInfo()
		}
	},
	methods:{
		formatPageInfo: function(){
			this.showNum= []
			let total = this.$props.total
			let pageSize = this.$props.pageSize
			let pageNum = this.$props.pageNum
			let totalPage = Math.ceil(total/pageSize)
			this.totalPage = totalPage
			if( totalPage < 5 || totalPage == 5 ){
				for(var i = 1; i < totalPage|| i == totalPage ; i ++ ){
					this.showNum.push(i)
				}
			}else if(pageNum == totalPage){
				this.showNum = [pageNum-4, pageNum-3, pageNum-2, pageNum-1, pageNum]
			}else if(pageNum == totalPage -1 ){
				this.showNum = [pageNum-3, pageNum - 2, pageNum - 1, pageNum, pageNum + 1]
			}else if (pageNum == 1){
				this.showNum = [pageNum, pageNum + 1, pageNum + 2, pageNum + 3, pageNum + 4]
			}else if(pageNum == 2){
				this.showNum = [pageNum-1, pageNum, pageNum + 1, pageNum + 2, pageNum + 3]
			}else{
				this.showNum = [pageNum-2, pageNum-1, pageNum, pageNum + 1, pageNum + 2]
			}
			this.page = this.pageNum
		},
		query: function(num){
			this.$emit('changePage', num)
		},
		toFirst: function(){
			this.$emit('changePage', 1)
		},
		toLast: function(){
			this.$emit('changePage', this.totalPage)
		},
		toBack: function(){
			if(this.pageNum == 1){
				return
			}else{
				this.$emit('changePage', this.pageNum - 1)
			}
		},
		toForward: function(){
			if(this.pageNum == this.totalPage){
				return
			}else{
				this.$emit('changePage', this.pageNum + 1)
			}
		},
		toPage: function(){
			let page = this.page
			if(page < 1){
				alert('页数必须大于1')
			}else if(page > this.totalPage){
				alert('页数必须小于或等于'+ this.totalPage)
			}else{
				this.$emit('changePage', page)
			}

		}
	}
}
</script>

<style>
.selected{
	background-color: grey;
}
</style>
