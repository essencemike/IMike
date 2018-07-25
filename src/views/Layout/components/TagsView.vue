<template lang="pug">
.tags-wrapper
  .tags-container
    eui-scroll-pane(ref="scrollPane")
      router-link.tags-view(
        v-for="tag in Array.from(visitedViews)",
        :key="tag.path",
        :to="tag.path",
        ref="tag",
      )
        eui-tag(
          :closable="tag.name === 'home' ? false : true",
          :color="isActive(tag) ? 'blue' : 'default'",
          @close="closeTag(tag)",
        ) {{ generateTitle(tag.meta.title) }}
  .tags-operate-wrapper
    el-dropdown(trigger="click", @command="handleTagOperate")
      el-button(size="mini", type="primary")
        | 标签选项
        i.el-icon-caret-bottom.el-icon--right
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(command="others") 关闭其他
        el-dropdown-item(command="all") 关闭所有
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { RouteConfig } from 'vue-router';
import { mixins as Mixins } from 'vue-class-component';
import { ADD_VISITED_VIEWS, DEL_VISITED_VIEWS, CLEAR_ALL_VIEWS, CLEAR_OTHERS_VIEWS } from '@/constants';
import { RouterTitleMixin } from '@/mixins';

@Component
export default class TagsView extends Mixins(RouterTitleMixin) {
  @Getter('visitedViews') visitedViews!: any;
  @Action(ADD_VISITED_VIEWS) ADD_VISITED_VIEWS: any;
  @Action(DEL_VISITED_VIEWS) DEL_VISITED_VIEWS: any;
  @Action(CLEAR_ALL_VIEWS) CLEAR_ALL_VIEWS: any;
  @Action(CLEAR_OTHERS_VIEWS) CLEAR_OTHERS_VIEWS: any;

  generateRoute() {
    if (this.$route.name) {
      return this.$route;
    }
    return false;
  }

  @Watch('$route')
  routeChange() {
    this.addViewTabs();
    this.moveToCurrentTag();
  }

  mounted() {
    this.addViewTabs();
  }

  addViewTabs() {
    const route = this.generateRoute();
    if (route) {
      this.ADD_VISITED_VIEWS(route);
    }
  }

  isActive(route: RouteConfig) {
    return route.path === this.$route.path;
  }

  moveToCurrentTag() {
    const tags = this.$refs.tag as any[];
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {
          const scrollPane = this.$refs.scrollPane as any;
          scrollPane.moveToView(tag.$el);
          break;
        }
      }
    });
  }

  async closeTag(tag: RouteConfig) {
    const tags = await this.DEL_VISITED_VIEWS(tag);

    if (this.isActive(tag)) {
      const latestView = [...tags].pop();

      if (latestView) {
        this.$router.push(latestView.path);
      } else {
        this.$router.push('/');
      }
    }
  }

  handleTagOperate(operate: string) {
    if (this.visitedViews.length === 1) return;
    if (operate === 'all') {
      this.$router.push('/');
      this.CLEAR_ALL_VIEWS();
    } else {
      const activeTag = this.visitedViews.find((item: any) => this.isActive(item));
      activeTag && this.CLEAR_OTHERS_VIEWS(activeTag);
    }

    this.$nextTick(() => {
      const scrollPane = this.$refs.scrollPane as any;
      scrollPane.moveToLeft();
    });
  }
}
</script>
<style lang="scss" scoped>
.tags-wrapper {
  position: relative;
  height: 40px;
  padding: 4px 0 0 0;
  overflow: visible;
  background-color: #f0f0f0;
  box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);

  .tags-view {
    margin-left: 10px;
  }

  .tags-container {
    width: calc(100% - 110px);
    height: 100%;
  }

  .tags-operate-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    width: 110px;
    height: 100%;
    padding: 8px 6px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
    box-sizing: border-box;
  }
}
</style>
