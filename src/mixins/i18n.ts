// translate router.meta.title, be used in breadcrumb sidebar tagsView
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class RouterTitleMixin extends Vue {
  generateTitle(title: string) {
    const hasKey = this.$te(`route.${title}`);
    const translatedTitle = this.$t(`route.${title}`);

    return hasKey ? translatedTitle : title;
  }
}
