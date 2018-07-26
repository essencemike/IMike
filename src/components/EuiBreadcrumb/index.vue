<template lang="pug">
el-breadcrumb.app-breadcrumb(separator="/")
  transition-group(name="breadcrumb")
    el-breadcrumb-item(v-for="(item, index) in levelList", :key="item.path")
      span.no-redirect(v-if="item.redirect === 'noredirect' || index === levelList.length - 1")
        i.fa(v-if="item.meta && item.meta.icon", :class="item.meta.icon", aria-hidden="true")
        | {{ generateTitle(item.meta.title) }}
      router-link(v-else, :to="item.redirect || item.path")
        i.fa(v-if="item.meta && item.meta.icon", :class="item.meta.icon", aria-hidden="true")
        | {{ generateTitle(item.meta.title) }}
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mixins as Mixins } from 'vue-class-component';
import { RouterTitleMixin } from '@/mixins';
import { RouteConfig } from 'vue-router';

@Component
export default class EuiBreadcrumb extends Mixins(RouterTitleMixin) {
  levelList: any[] = [];

  created() {
    this.getBreadcrumb();
  }

  @Watch('$route')
  routeChange() {
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    let matched = this.$route.matched.filter((item) => item.name) as RouteConfig[];
    const first = matched[0];

    if (first && first.name !== 'home') {
      matched = [{ path: '/', meta: { title: 'home', icon: 'fa-home' } } as RouteConfig].concat(matched);
    }

    this.levelList = matched.filter((item) => item.meta && item.meta.title);
  }
}
</script>
<style lang="scss" scoped>
.app-breadcrumb {
  margin-left: 10px;

  [class^=fa] {
    margin-right: 5px;
  }
}
</style>
