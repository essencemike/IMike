<template lang="pug">
  el-container.app-wrapper(:class="{ hideSidebar: !sidebar.opened }")
    el-aside.app-aside-wrapper(width="200px")
      sidebar
    el-container
      el-header.app-header
        navbar
      tags-view
      el-main.no-pad
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
  }
}
</style>
