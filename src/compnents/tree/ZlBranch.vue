<template>
    <div>
        <ul :class="'ul-'+ level">
          <li v-if="branch.children && branch.children.length!== 0"><a><p class="branch-close" aria-expanded="false"  @click="expend">{{branch.name}}</p></a>
            <ul>
              <li :id=branch.name v-for="(children, index) in branch.children" :key="index">
                <zl-branch :branch="children" v-bind:level="Number(level) + 1" :sel="sel"></zl-branch>
              </li>
            </ul>
          </li>
          <li  v-if="!branch.children || branch.children.length=== 0"><a><p  @click="expend">{{branch.name}}</p></a></li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: 'ZlBranch',
        props:{'branch':{
            type: Object
            },'level':{
            type: Number
            },'sel':{
            type: Object
            }
        },
        data: function(){
            return {
                isClose: true
            }
        },
        methods: {
            expend: function(e){
              let attr = e.target.getAttribute("aria-expanded");
              if(attr){
                if(attr === 'false') {
                  e.target.setAttribute("aria-expanded", true);
                }else {
                  e.target.setAttribute("aria-expanded", false);
                }
                e.target.parentElement.parentElement.querySelectorAll("#" + e.target.innerHTML.trim()).forEach(child => {
                  if (child.classList.contains("visually-hidden")) {
                    child.classList.remove("visually-hidden")
                  } else {
                    child.classList.add("visually-hidden")
                  }
                })
              }
              this.sel.data = this.branch
            }
        }
    }
</script>

<style scoped>

</style>
