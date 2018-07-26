<template lang="pug">
el-scrollbar(wrapClass="scrollbar-wrapper")
  el-menu.app-menu(
    mode="vertical",
    :show-timeout="200",
    :default-active="$route.path",
    :collapse="isCollapse",
    background-color="#545c64",
    text-color="#fff",
    active-text-color="#ffd04b",
    @select="handleSelect",
  )
    sidebar-item(
      v-for="route in routes",
      :key="route.path",
      :item="route",
      :base-path="route.path",
    ) {{ route.name }}
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { RouteConfig } from 'vue-router';

import SidebarItem from './SidebarItem.vue';

@Component({
  components: { SidebarItem },
})
export default class Sidebar extends Vue {
  @Getter('sidebar') sidebar: any;
  @Getter('routes') routes!: RouteConfig[];

  get isCollapse() {
    return !this.sidebar.opened;
  }

  handleSelect(name: string) {
    if (name.indexOf('isTurnByHref__') > -1) {
      window.open(name.split('__')[1]);
      return;
    }
  }
}
</script>
<style lang="scss" scoped>
.app-menu {
  border-right-color: #545c64;
}
</style>
