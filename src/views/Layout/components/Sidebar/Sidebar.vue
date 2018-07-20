<template lang="pug">
el-scrollbar(wrapClass="scrollbar-wrapper")
  el-menu.app-menu(
    mode="vertical",
    :show-timeout="200",
    default-active="1-4-1",
    :collapse="isCollapse",
    background-color="#545c64",
    text-color="#fff",
    active-text-color="#ffd04b",
  )
    el-submenu(index="1")
      template(slot="title")
        i.el-icon-location
        span(slot="title") 导航一
      el-menu-item-group
        span(slot="title") 分组一
        el-menu-item(index="1-1") 选项1
        el-menu-item(index="1-2") 选项2
      el-menu-item-group(title="分组2")
        el-menu-item(index="1-3") 选项3
      el-submenu(index="1-4")
        span(slot="title") 选项4
        el-menu-item(index="1-4-1") 选项1
    el-menu-item(index="2")
      i.el-icon-menu
      span(slot="title") 导航二
    el-menu-item(index="3", disabled)
      i.el-icon-document
      span(slot="title") 导航三
    el-menu-item(index="4")
      i.el-icon-setting
      span(slot="title") 导航四
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class Sidebar extends Vue {
  @Getter('sidebar') sidebar: any;

  get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>
<style lang="scss" scoped>
.app-menu {
  border-right: 0;
}
</style>
