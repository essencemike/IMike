<template lang="pug">
el-dropdown(trigger="click", @command="handleSetLanguage")
  span.navbar-icon
    i.fa.fa-language(aria-hidden="true")
  el-dropdown-menu(slot="dropdown")
    el-dropdown-item(command="zh", :disabled="language === 'zh'") 中文
    el-dropdown-item(command="en", :disabled="language === 'en'") English
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { SET_LANGUAGE } from '@/constants';
import Cookies from 'js-cookie';

@Component
export default class EuiLangSelect extends Vue {
  @Getter('language') language!: string;

  @Action(SET_LANGUAGE) SET_LANGUAGE: any;

  handleSetLanguage(lang: string) {
    this.$i18n.locale = lang;
    this.SET_LANGUAGE(lang);
  }
}
</script>
<style lang="scss" scoped>
</style>
