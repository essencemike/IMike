<template lang="pug">
.tags-wrapper
  router-link.tags-view(
    v-for="(tag, index) in Array.from(lastedVisitedViews)",
    :key="index",
    :to="tag.path"
  )
    el-tag(
      :closeable="true",
      :type="isActive(tag.path) ? 'primary' : ''",
      @close.prevent="closeViewTabs(tag)"
    ) {{ tag.meta.label }}
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { RouteConfig } from 'vue-router';
import { ADD_VISITED_VIEWS, DEL_VISITED_VIEWS } from '@/constants';

@Component
export default class TagsView extends Vue {
  @Getter('visitedViews') visitedViews!: any[];
  @Action(ADD_VISITED_VIEWS) ADD_VISITED_VIEWS: any;
  @Action(DEL_VISITED_VIEWS) DEL_VISITED_VIEWS: any;

  get lastedVisitedViews() {
    return this.visitedViews.slice(-6);
  }

  async closeViewTabs(view: RouteConfig) {
    const views = await this.DEL_VISITED_VIEWS(view);
    if (this.isActive(view.path)) {
      const latestView = views.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.path);
      } else {
        this.$router.push('/');
      }
    }
  }

  generateRoute() {
    const lastMatched = this.$route.matched[this.$route.matched.length - 1];
    if (lastMatched.meta.label) {
      return lastMatched;
    }

    this.$route.matched[0].path = '/';
    return this.$route.matched[0];
  }

  @Watch('$route')
  async addViewTabs() {
    await this.ADD_VISITED_VIEWS(this.generateRoute());
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
