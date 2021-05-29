<template>
	<div>
		<form :action="url" :method="method">
			<zl-f-table ref="fTable" v-if="forceUpdate" :column="column" :reqData="reqData">
				<slot/>
			</zl-f-table>
		</form>

	</div>
</template>

<script>
	import ZlFTable from './ZlFTable.vue'
	export default {
		name: 'ZlForm',
		props:['column','url', 'method','validate'],
		components:{ZlFTable},
		data: function(){
			return {
				reqData: {},
				forceUpdate: true
			}
		},
		methods:{
			getData: function(name){
				return this.reqData[name]
			},
			setData: function (name,val) {
				this.$vnode.elm.children[0][name].value = val
				this.$set(this.reqData, name,val)
			},
			hiddenField: function(name){
				this.$refs['fTable'].$refs[name][0].isHidden= true
				this.$refs['fTable'].$refs[name][1].isHidden= true
				this.$set(this.reqData, name,'')
			},
			showField: function(name){
				this.$refs['fTable'].$refs[name][0].isHidden= false
				this.$refs['fTable'].$refs[name][1].isHidden= false
			},
			checkAll: function () {
				let result = true;
				let children = this.$children
				if(children){
					result = this.check(children)
				}

				if(result){
					if(typeof(this.validate) === 'function'){
						result = this.validate()
					}
					return result
				}else{
					return result
				}
			},
			check: function (obs) {
				let flag = true
				if(obs.length === 0){
					return flag
				}
				for(let i = 0; i < obs.length; i ++){
					let ob = obs[i]
					if(ob){
						if(ob.validate){
							let result = ob.validate()
							if(!result){
								ob.validate()
								flag = result
								console.log(ob)
							}
						}
						let children = ob.$children
						if(children){
							let result = this.check(children)
							if(!result){
								flag = result
								console.log(ob)
							}
						}
					}
				}
				return flag

			},
			reset: function () {
				this.forceUpdate = false
				this.$nextTick(() => {
					this.forceUpdate = true
				});
			}
		}
	}
</script>

<style>
</style>
