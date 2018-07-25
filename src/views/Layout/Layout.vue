<template lang="pug">
  el-container.app-wrapper
    el-aside.app-aside-wrapper(:width="sideWidth")
      sidebar
    el-container
      el-header.app-header
        navbar
      tags-view
      el-main.app-main-wrapper
        app-main
</template>
<script lang="ts">
import { Getter } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import { Navbar, Sidebar, AppMain, TagsView } from './components';

@Component({
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },
})
export default class Layout extends Vue {
  @Getter('sidebar') sidebar: any;

  get sideWidth() {
    return this.sidebar.opened ? '200px' : '64px';
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;

  .app-header {
    background-color: #fff;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, .1);
    position: relative;
    z-index: 11;
  }

  .app-aside-wrapper {
    background-color: $aside-bg-color;
    transition: width 0.38s;
  }

  .app-main-wrapper {
    overflow-x: hidden;
    padding: 0;
  }
}
</style>
