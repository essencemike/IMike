<template lang="pug">
.menu-wrapper(v-if="!item.hidden && item.children")
  router-link(
    v-if="hasOneShowingChild(item.children) && !onlyOneChild.children",
    :to="resolvePath(onlyOneChild.path)"
  )
    el-menu-item(:index="resolvePath(onlyOneChild.path)", :class="{'submenu-title-noDropdown': !isNest}")
      i.fa(v-if="onlyOneChild.meta && onlyOneChild.meta.icon", :class="onlyOneChild.meta.icon", aria-hidden="true")
      span(v-if="onlyOneChild.meta && onlyOneChild.meta.title", slot="title") {{ generateTitle(onlyOneChild.meta.title) }}
  el-submenu(v-else, :index="item.name || item.path")
    template(slot="title")
      i.fa(v-if="item.meta && item.meta.icon", :class="item.meta.icon", aria-hidden="true")
      span(v-if="item.meta && item.meta.title", slot="title") {{ generateTitle(item.meta.title) }}
    template(v-for="child in displayRoutes(item.children)")
      sidebar-item.nest-menu(
        :is-nest="true",
        v-if="child.children && child.children.length > 0",
        :item="child",
        :key="child.path",
        :base-path="resolvePath(child.path)",
      )
      router-link(v-else, :to="resolvePath(child.path)", :key="child.name")
        el-menu-item(:index="resolvePath(child.path)")
          i.fa(v-if="child.meta && child.meta.icon", :class="child.meta.icon", aria-hidden="true")
          span(v-if="child.meta && child.meta.title", slot="title") {{ generateTitle(child.meta.title) }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mixins as Mixins } from 'vue-class-component';
import { RouterTitleMixin } from '@/mixins';
import path from 'path';

@Component
export default class SidebarItem extends Mixins(RouterTitleMixin) {
  @Prop({ type: Object, required: true }) item!: object;
  @Prop({ type: Boolean, default: false }) isNest!: boolean;
  @Prop({ type: String, default: '' }) basePath!: string;

  onlyOneChild: any = null;

  hasOneShowingChild(children: any[]) {
    const showingChildren = children.filter((item) => {
      if (item.hidden) {
        return false;
      } else {
        this.onlyOneChild = item;
        return true;
      }
    });

    return showingChildren.length === 1;
  }

  resolvePath(...paths: string[]) {
    return path.resolve(this.basePath, ...paths);
  }

  displayRoutes(routes: any[]) {
    return routes.filter((route) => !route.hidden);
  }
}
</script>
<style lang="scss" scoped>
.menu-wrapper {
  [class^=fa] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  a {
    text-decoration: none;
  }
}
</style>
