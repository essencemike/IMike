<template lang="pug">
.tags-wrapper
  router-link.tags-view(
    v-for="tag in Array.from(visitedViews)",
    :key="tag.path",
    :to="tag.path"
  )
    el-tag(
      :closeable="true",
      :type="isActive(tag.path) ? 'primary' : ''",
    ) {{ generateTitle(tag.meta.title) }}
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { RouteConfig } from 'vue-router';
import { mixins as Mixins } from 'vue-class-component';
import { ADD_VISITED_VIEWS, DEL_VISITED_VIEWS } from '@/constants';
import { RouterTitleMixin } from '@/mixins';

@Component
export default class TagsView extends Mixins(RouterTitleMixin) {
  @Getter('visitedViews') visitedViews!: any;
  @Action(ADD_VISITED_VIEWS) ADD_VISITED_VIEWS: any;
  @Action(DEL_VISITED_VIEWS) DEL_VISITED_VIEWS: any;

  generateRoute() {
    if (this.$route.name) {
      return this.$route;
    }
    return false;
  }

  @Watch('$route')
  addViewTabs() {
    const route = this.generateRoute();
    if (route) {
      this.ADD_VISITED_VIEWS(route);
    }
  }

  isActive(path: string) {
    return path === this.$route.path;
  }
}
</script>
<style lang="scss" scoped>
.tags-wrapper {
  height: 40px;
  z-index: -1;
  overflow: hidden;
  background-color: #f0f0f0;

  .tags-view {
    margin-left: 10px;
  }
}
</style>
