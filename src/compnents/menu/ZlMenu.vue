<template>
    <div class="flex-shrink-0 menu">
        <ul class="list-unstyled ps-0 " data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item menu-open" v-for="(item, index) in menu" :key="index">
            <ZlMenuItem :data="item">
            </ZlMenuItem>
          </li>
        </ul>
    </div>
</template>

<script>
import ZlMenuItem from "./ZlMenuItem";

export default {
  name: 'ZlMenu',
  props: ['menu'],
  components: {
    ZlMenuItem
  }
}
</script>
<style>
main {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

li{
  height: 40px;
}
li a{
  position: relative;
  height: 100%;
}

li a p {
  position: absolute;
  height: 100%;
  top: 33%;
}
</style>
