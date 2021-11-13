<template>
  <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small body-color">
    <li v-if="data.path != null && data.path !== ''">
      <router-link class=" link-dark rounded" :to="data.path"><p>{{ data.name }}</p></router-link>
    </li>
    <li v-else>
      <button class="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse"
              data-bs-target="#home-collapse" aria-expanded="false" @click="showChild">
        {{ data.name }}
      </button>
    </li>
    <div class="visually-hidden btn-toggle-child" :id=data.name v-for="(val, index) in data.children" v-bind:key="index">
      <ZlMenuItem :data="val"></ZlMenuItem>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'ZlMenuItem',
  props: {
    data: {
      Object,
      default: () => ({
        path: '#'
      })
    }
  },
  data: function () {
    return {
      active: true
      // menuStyle: {
      //     width: '100%',
      //     height: '50px',
      //     backgroundColor: '#66CCCC',
      //     textAlign: 'center',
      //     lineHeight: '50px',
      //     top: '50%',
      //     border: '1px solid transparent',
      //     clear: 'both'
      // }
    }
  },
  // mounted:function(){
  //     var menuStyle = this.$parent.menuStyle
  //     if(menuStyle){
  //         var color = menuStyle.backgroundColor
  //         var startColor =  color.substring(0, 5)
  //         var endColor = color.substring(4, 6)
  //         endColor = parseInt(endColor,16)
  //         endColor = endColor + 20;
  //         if(endColor < 0){
  //             endColor = 0
  //         }
  //         endColor = endColor.toString(16).toUpperCase()
  //         color = startColor + endColor
  //         this.menuStyle.backgroundColor = color
  //     }
  // },
  methods: {
    over: function () {
      this.menuStyle.border = 'solid 1px grey'
    },
    out: function () {
      this.menuStyle.border = 'solid 1px transparent'
    },
    click: function () {

      if (this.$children) {
        this.active = !this.active;
      }
    },
    showChild: function (e) {
      let attr = e.target.getAttribute("aria-expanded");
      if(attr === 'false' ||!attr) {
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
  }
}
</script>

<style>
li button {
  width: 100%;
  text-align: left !important;
}

</style>
