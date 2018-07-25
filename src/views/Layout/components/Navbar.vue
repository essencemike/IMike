<template lang="pug">
.app-navbar
  eui-hamburger.hamburger-container(:isActive="sidebar.opened", @icon-click="toggleSidebar")
  eui-breadcrumb.breadcrumb-container
  .right-navbar
    eui-screenfull
    eui-lang-select.lang-container
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { TOGGLE_SIDEBAR } from '@/constants';

@Component
export default class Navbar extends Vue {
  @Getter('sidebar') sidebar: any;

  @Action(TOGGLE_SIDEBAR) TOGGLE_SIDEBAR: any;

  toggleSidebar() {
    this.TOGGLE_SIDEBAR();
  }
}
</script>
<style lang="scss" scoped>
.app-navbar {
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;

  .right-navbar {
    margin-left: auto;
  }

  .lang-container {
    margin-left: 20px;
  }
}
</style>
