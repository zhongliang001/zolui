<template>
	<table   v-bind="$attrs" v-on="$listeners">
		<tr v-for="i in rows">
			<zl-td :ref="field.name" v-for="(field, index) in fields[i - 1]" :key="index" :field="field" :reqData="reqData"/>
		</tr>
		<slot></slot>
	</table>
</template>

<script>
	import ZlTd from "./ZlTd.vue";
	export default{
		name: 'ZlFTable',
		props:['column','reqData'],
		components: {ZlTd},
		data: function(){
			return {
				rows: 0,
				fields:[]
			}
		},
    watch:{
      fields:{
        handler: function (o, b){
          this.fields = o
        },
        deep: true
      }
    },
		mounted: function(){
			let children = this.$children
			if(!children){
				return
			}
			this.rows = Math.ceil(children.length / this.column)
			let i = 0
			for(let j = 0; j < this.rows; j ++){
				let n= 0
        let line = []
				for(; i< children.length; i++, n++){
					let field =  {}
          field.index = n
					field.fieldName = this.$children[i].fieldName + ':'
					field.name=this.$children[i].name
					field.hidden = this.$children[i].hidden
					field.cstclass = this.$children[i].cstclass
          field.readOnly = this.$children[i].readOnly
          line.push(field)
          n++
					let field2 ={}
					field2 =  JSON.parse(JSON.stringify(this.$children[i].$props))
          field2.index = n
          line.push(field2)
					if((i+1) % this.column === 0){
						i ++
            this.fields.push(line)
						break
					}

				}
			}
			this.$forceUpdate()
		},
    methods:{
    changeReadOnly: function (name, readOnly) {
      let _this  = this
      this.fields.forEach(field=>{
        field.forEach(f=>{
          if (f.name === name) {
              console.log(f)
            f.readOnly = readOnly
          }
        })
      })
      this.$forceUpdate()
    }
    }
	}
</script>

<style>
</style>
